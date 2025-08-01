import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, Notice, TextControl } from "@wordpress/components";
import { useEffect, useMemo, useState, useRef } from "react";
import { GalleryI } from "../types";
import ImageComponent from "../components/ImageComponent";
import { getHeaders } from "../helpers/http";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface PropsI {
  gallery: GalleryI;
}

interface ImageI {
  id: number; // This must be truly unique and stable for each image object in the array
  media_id: number; // This is the WordPress media library ID (can repeat)
  order_by: number;
}
type NoticeT = "info" | "warning" | "success" | "error" | undefined;

const Gallery = ({ gallery }: PropsI) => {
  const [isPending, setIsPending] = useState(false);
  const [galleryName, setGalleryName] = useState(gallery.title);
  const [notice, setNotice] = useState<NoticeT>(undefined);
  const [images, setImages] = useState<ImageI[]>([]);
  // Use a ref to keep a unique ID counter that persists across renders
  const uniqueIdCounter = useRef(0);
  const [parentRef] = useAutoAnimate();

  useEffect(() => {
    const initialImages: ImageI[] = [];
    if (gallery.media_ids) {
      gallery.media_ids
        .split(",")
        .filter(Boolean) // Filter out any empty strings
        .forEach((media_id_str) => {
          uniqueIdCounter.current += 1;
          initialImages.push({
            id: uniqueIdCounter.current, // Assign a unique client-side ID
            media_id: +media_id_str,
            order_by: 0, // Temporarily set order_by, will be sorted below
          });
        });
    }

    // Sort and re-assign order_by based on their initial order in the string
    const sortedInitialImages = initialImages
      .sort((a, b) => {
        return initialImages.indexOf(a) - initialImages.indexOf(b);
      })
      .map((image, index) => ({
        ...image,
        order_by: index + 1,
      }));

    setImages(sortedInitialImages);
    setGalleryName(gallery.title);
  }, [gallery.media_ids, gallery.title]);

  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => a.order_by - b.order_by);
  }, [images]);

  const moveUp = (order_by: number) => {
    if (order_by === 1) return;
    const newImages = sortedImages
      .map((image) => {
        if (image.order_by === order_by) {
          return { ...image, order_by: image.order_by - 1 };
        } else if (image.order_by === order_by - 1) {
          return { ...image, order_by: image.order_by + 1 };
        }
        return image;
      })
      .sort((a, b) => a.order_by - b.order_by);
    setImages(newImages);
  };

  const moveDown = (order_by: number) => {
    if (order_by === images.length) return;
    const newImages = sortedImages
      .map((image) => {
        if (image.order_by === order_by) {
          return { ...image, order_by: image.order_by + 1 };
        } else if (image.order_by === order_by + 1) {
          return { ...image, order_by: image.order_by - 1 };
        }
        return image;
      })
      .sort((a, b) => a.order_by - b.order_by);
    setImages(newImages);
  };

  const removeImage = (order_by: number) => {
    const newImages = sortedImages
      .filter((image) => image.order_by !== order_by)
      .sort((a, b) => a.order_by - b.order_by)
      .map((image, index) => {
        return { ...image, order_by: index + 1 }; // Only update order_by
      });
    setImages(newImages);
  };

  const saveChanges = async () => {
    setIsPending(true);
    try {
      const response = await fetch(wpApiSettings.api_url + "gallery/" + gallery.id, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          title: galleryName,
          media_ids: sortedImages.map((image) => image.media_id).join(","),
        }),
      });
      await response.json();
      setNotice("success");
      setTimeout(() => setNotice(undefined), 10000);
    } catch (err) {
      console.error("Failed to save changes:", err);
      setNotice("error");
      setTimeout(() => setNotice(undefined), 3000);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid gap-2">
      <section className="flex gap-1 flex-wrap justify-between items-end">
        <TextControl
          className="grow"
          placeholder="Nazwa galerii"
          value={galleryName}
          onChange={(value) => setGalleryName(value)}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />
        <MediaUploadCheck>
          <MediaUpload
            // 1. Set `multiple` to true to allow multi-selection
            multiple={true}
            onSelect={(selectedMedia) => {
              // 2. `selectedMedia` will now be an array of media objects
              const newImagesToAdd: ImageI[] = selectedMedia.map((media: { id: number }) => {
                uniqueIdCounter.current += 1; // Increment for each new image
                return {
                  id: uniqueIdCounter.current, // Assign unique client-side ID
                  media_id: media.id, // The WordPress media ID
                  order_by: 0, // Temporarily set, will be re-ordered below
                };
              });

              // Combine existing images with new ones and re-sort their order_by
              const combinedImages = [...images, ...newImagesToAdd]
                .sort(
                  (a, b) => a.order_by - b.order_by, // Sort based on current order_by
                )
                .map((image, index) => ({
                  ...image,
                  order_by: index + 1, // Reassign order_by sequentially
                }));
              setImages(combinedImages);
            }}
            allowedTypes={["image"]}
            render={({ open }) => {
              return (
                <Button style={{ height: "100%" }} onClick={open} variant="secondary" icon={"images-alt"}>
                  {"Dodaj zdjęcia"} {/* Changed text to plural */}
                </Button>
              );
            }}
          />
        </MediaUploadCheck>
      </section>
      <section ref={parentRef} className="grid-3 gap-2 paper images-container px-2 py-2">
        {sortedImages.map((image) => (
          <div key={image.id}>
            <div className="paper flex flex-col justify-center items-center px-2 pb-1">
              <section className="grid-1">
                <div className="flex justify-between items-center">
                  <div className="flex gap1">
                    <Button
                      disabled={image.order_by === 1}
                      onClick={() => moveUp(image.order_by)}
                      icon={"arrow-left-alt"}
                    />
                    <Button
                      disabled={image.order_by === images.length}
                      onClick={() => moveDown(image.order_by)}
                      icon={"arrow-right-alt"}
                    />
                  </div>
                  <Button icon={"trash"} onClick={() => removeImage(image.order_by)} />
                </div>
                <ImageComponent media_id={image.media_id} alt={"Zdjęcie gallerii"} style={{ aspectRatio: "16/9" }} />
              </section>
            </div>
          </div>
        ))}
      </section>
      <section className="flex gap-4 flex-wrap justify-between items-center">
        <div>
          {notice && (
            <Notice status={notice === "success" ? "success" : "error"} isDismissible={false}>
              {notice === "success" ? "Wczytano zmiany" : "Błąd zapisu"}
            </Notice>
          )}
        </div>
        <Button
          variant="primary"
          onClick={saveChanges}
          disabled={isPending}
          className="flex justify-center items-center"
        >
          Zmień
        </Button>
      </section>
    </div>
  );
};

export default Gallery;
