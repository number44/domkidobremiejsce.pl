package main

import (
	"bufio"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/joho/godotenv"
	"golang.org/x/net/html"
)

// HtmlValidationError represents a found HTML validation issue with line number
type HtmlValidationError struct {
	FilePath string
	Line     int // Line number where the issue was detected
	Message  string
	Tag      string // The tag involved in the error
}

// getLineNumberFromOffset converts a byte offset to a line number using precomputed lineOffsets.
func getLineNumberFromOffset(offset int64, lineOffsets []int64) int {
	// Perform a binary search to find the line number
	// find the largest index i such that lineOffsets[i] <= offset
	low, high := 0, len(lineOffsets)-1
	ans := 0
	for low <= high {
		mid := low + (high-low)/2
		if lineOffsets[mid] <= offset {
			ans = mid
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return ans + 1 // Line numbers are 1-based
}

// checkHtmlForUnclosedTagsWithPreciseLines parses HTML content and identifies unclosed tags,
// including the precise line number where the issue is likely to be based on token start offset.
func checkHtmlForUnclosedTagsWithPreciseLines(htmlContent, filePath string, lineOffsets []int64) []HtmlValidationError {
	var errors []HtmlValidationError
	reader := strings.NewReader(htmlContent)
	tokenizer := html.NewTokenizer(reader)

	var tagStack []string // Stack to keep track of open tags

	for {
		// Calculate the current offset *before* consuming the next token.
		// reader.Size() is the total size of the string.
		// reader.Len() is the number of bytes remaining.
		// So, reader.Size() - reader.Len() is the number of bytes already consumed (current position).
		currentOffset := reader.Size() - int64(reader.Len())

		tt := tokenizer.Next()
		token := tokenizer.Token()

		switch tt {
		case html.ErrorToken:
			err := tokenizer.Err()
			if err == io.EOF {
				// End of file, check for any remaining unclosed tags on the stack
				for i := len(tagStack) - 1; i >= 0; i-- {
					errors = append(errors, HtmlValidationError{
						FilePath: filePath,
						Line:     getLineNumberFromOffset(currentOffset, lineOffsets),
						Message:  fmt.Sprintf("Unclosed tag: <%s>", tagStack[i]),
						Tag:      tagStack[i],
					})
				}
				return errors
			}
			// Other parsing errors
			errors = append(errors, HtmlValidationError{
				FilePath: filePath,
				Line:     getLineNumberFromOffset(currentOffset, lineOffsets),
				Message:  fmt.Sprintf("HTML parsing error: %s", err),
				Tag:      "",
			})
			return errors
		case html.StartTagToken:
			tagName := token.Data
			tagStack = append(tagStack, tagName)

		case html.EndTagToken:
			tagName := token.Data
			if len(tagStack) == 0 {
				errors = append(errors, HtmlValidationError{
					FilePath: filePath,
					Line:     getLineNumberFromOffset(currentOffset, lineOffsets),
					Message:  fmt.Sprintf("Closing tag </%s> found without matching opening tag.", tagName),
					Tag:      tagName,
				})
				continue
			}

			foundIndex := -1
			for i := len(tagStack) - 1; i >= 0; i-- {
				if tagStack[i] == tagName {
					foundIndex = i
					break
				}
			}

			if foundIndex == -1 {
				errors = append(errors, HtmlValidationError{
					FilePath: filePath,
					Line:     getLineNumberFromOffset(currentOffset, lineOffsets),
					Message:  fmt.Sprintf("Closing tag </%s> does not match the most recently opened tag or is out of order.", tagName),
					Tag:      tagName,
				})
			} else {
				for i := len(tagStack) - 1; i > foundIndex; i-- {
					errors = append(errors, HtmlValidationError{
						FilePath: filePath,
						Line:     getLineNumberFromOffset(currentOffset, lineOffsets), // Line of the closing tag that "revealed" the unclosed one
						Message:  fmt.Sprintf("Unclosed tag: <%s> (expected before </%s>)", tagStack[i], tagName),
						Tag:      tagStack[i],
					})
				}
				tagStack = tagStack[:foundIndex]
			}
		}
	}
}

// readFileAndCountLines reads content and manually tracks lines for precise line counting
func readFileAndCountLines(filePath string) (string, []int64, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", nil, err
	}
	defer file.Close()

	var contentBuilder strings.Builder
	var lineOffsets []int64              // Stores the byte offset of the start of each line
	lineOffsets = append(lineOffsets, 0) // Line 1 starts at offset 0 (int64)

	reader := bufio.NewReader(file)
	offset := int64(0) // Initialize offset as int64
	for {
		line, err := reader.ReadString('\n')
		if err != nil && err != io.EOF {
			return "", nil, err
		}
		contentBuilder.WriteString(line)
		offset += int64(len(line)) // Add len(line) as int64
		if err == io.EOF {
			break
		}
		lineOffsets = append(lineOffsets, offset)
	}
	return contentBuilder.String(), lineOffsets, nil
}

func main() {
	// Load environment variables from .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	wpBlocksDir := os.Getenv("WP_BLOCKS_DIR")
	wpBlocksFolderPrefix := os.Getenv("WP_BLOCKS_FOLDER_PREFIX")

	if wpBlocksDir == "" {
		log.Fatal("WP_BLOCKS_DIR environment variable not set in .env")
	}
	if wpBlocksFolderPrefix == "" {
		log.Fatal("WP_BLOCKS_FOLDER_PREFIX environment variable not set in .env")
	}

	fmt.Printf("Scanning for render.php files in '%s' for folders starting with '%s'\n", wpBlocksDir, wpBlocksFolderPrefix)

	var allErrors []HtmlValidationError

	// Walk through the WP_BLOCKS_DIR
	err = filepath.WalkDir(wpBlocksDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			fmt.Printf("Error accessing path %s: %v\n", path, err)
			return err // Continue walking but report error
		}

		// Check if it's a directory and matches the prefix
		if d.IsDir() && strings.HasPrefix(d.Name(), wpBlocksFolderPrefix) {
			blockFolderPath := path
			renderFilePath := filepath.Join(blockFolderPath, "render.php")

			// Check if render.php exists in this folder
			if _, err := os.Stat(renderFilePath); err == nil {
				fmt.Printf("Found: %s\n", renderFilePath)

				// Read file content and precompute line offsets
				content, lineOffsets, err := readFileAndCountLines(renderFilePath)
				if err != nil {
					fmt.Printf("  Error reading file %s: %v\n", renderFilePath, err)
					return nil // Don't stop, continue to next file
				}

				fileErrors := checkHtmlForUnclosedTagsWithPreciseLines(content, renderFilePath, lineOffsets)
				if len(fileErrors) > 0 {
					allErrors = append(allErrors, fileErrors...)
				} else {
					fmt.Printf("  No unclosed HTML tags detected.\n")
				}
			}
		}
		return nil
	})

	if err != nil {
		fmt.Printf("Error walking the directory: %v\n", err)
	}

	// Report all collected errors
	if len(allErrors) > 0 {
		fmt.Println("\n--- HTML Validation Report ---")
		for _, e := range allErrors {
			fmt.Printf("  File: %s:%d\n", e.FilePath, e.Line) // Changed format to FILE:LINE
			fmt.Printf("    Error: %s\n", e.Message)
			if e.Tag != "" {
				fmt.Printf("    Problematic Tag: <%s>\n", e.Tag)
			}
			fmt.Println("----------------------------")
		}
		log.Fatalf("Detected %d HTML validation errors.", len(allErrors))
	} else {
		fmt.Println("\nAll relevant render.php files checked. No unclosed HTML tags detected.")
	}
}
