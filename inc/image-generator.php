<?php
function my_lazy_load_image(int $media_id, string $size_prefix, string $css_class = 'lazy-load-image', array $extra_attr = []): string
{
    // Construct the full image size names
    $small_size_name = $size_prefix . '-sm';
    $large_size_name = $size_prefix . '-lg';

    // Get the URL for the small placeholder image
    $small_image_url = wp_get_attachment_image_url($media_id, $small_size_name);

    // Get the full image tag for the large version, letting WP generate srcset/sizes
    // We'll then extract its attributes
    $large_image_html = wp_get_attachment_image($media_id, $large_size_name, false, [
        'class' => 'temp-class-for-extraction', // Use a temporary class to extract attributes
        'loading' => 'eager', // Ensure wp_get_attachment_image doesn't add native lazy load for us
    ]);

    // Error handling if small image or large image HTML extraction fails
    if (!$small_image_url || empty($large_image_html)) {
        // You might want to log an error here or return a placeholder
        error_log("Missing image data for ID: {$media_id}, prefix: {$size_prefix}");
        return '';
    }

    // Use DOMDocument to parse the generated <img> tag and extract attributes
    $dom = new DOMDocument();
    @$dom->loadHTML($large_image_html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    $img_element = $dom->getElementsByTagName('img')->item(0);

    if (!$img_element) {
        error_log("Could not parse img tag for ID: {$media_id}, prefix: {$size_prefix}");
        return '';
    }

    // Extract attributes from the large image's generated HTML
    $large_src_url = $img_element->getAttribute('src');
    $srcset_attr = $img_element->getAttribute('srcset');
    $sizes_attr = $img_element->getAttribute('sizes');
    $width_attr = $img_element->getAttribute('width');
    $height_attr = $img_element->getAttribute('height');
    $image_alt = get_post_meta($media_id, '_wp_attachment_image_alt', true);

    // Start building the final <img> tag for lazy loading
    $output = '<img ';

    // The initial 'src' should be the small placeholder
    $output .= 'src="' . esc_url($small_image_url) . '" ';

    // Add your data attributes for lazy loading
    $output .= 'data-src-small="' . esc_url($small_image_url) . '" ';
    $output .= 'data-src-large="' . esc_url($large_src_url) . '" '; // Use the actual src of the large image

    // Add srcset and sizes attributes as data attributes to be swapped later
    if (!empty($srcset_attr)) {
        $output .= 'data-srcset="' . esc_attr($srcset_attr) . '" ';
    }
    if (!empty($sizes_attr)) {
        $output .= 'data-sizes="' . esc_attr($sizes_attr) . '" ';
    }

    // Crucially, add intrinsic width and height for CLS prevention
    if (!empty($width_attr)) {
        $output .= 'width="' . esc_attr($width_attr) . '" ';
    }
    if (!empty($height_attr)) {
        $output .= 'height="' . esc_attr($height_attr) . '" ';
    }

    // Add alt text for accessibility
    $output .= 'alt="' . esc_attr($image_alt) . '" ';

    // Add the default and any custom CSS classes
    $combined_classes = $css_class;
    if (strpos($combined_classes, 'lazy-load-image') === false) { // Ensure 'lazy-load-image' is always present
        $combined_classes .= ' lazy-load-image';
    }
    $output .= 'class="' . esc_attr(trim($combined_classes)) . '" ';

    // Add any extra attributes
    foreach ($extra_attr as $attr_name => $attr_value) {
        $output .= esc_attr($attr_name) . '="' . esc_attr($attr_value) . '" ';
    }
    // Close the img tag
    $output .= '/>';
    return $output;
}