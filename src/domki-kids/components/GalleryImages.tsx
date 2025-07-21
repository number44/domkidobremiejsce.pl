import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Notice, TextControl } from '@wordpress/components';
import { useEffect, useMemo, useState, useRef } from 'react';
import { ApiGalleryI, AttributesI, GalleryI } from '../types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getHeaders } from '@/helpers/http';
import ImageComponent from '@components/ImageComponent';

interface PropsI {
  gallery: GalleryI;
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  apiGalleries: ApiGalleryI[];
}

interface ImageI {
  id: number; // Unique client-side ID
  media_id: number; // WordPress media library ID (can repeat)
  order_by: number;
}
type NoticeT = 'info' | 'warning' | 'success' | 'error' | undefined;

const GalleryImages = ({ attributes, setAttributes, apiGalleries }: PropsI) => {
  const [isPending, setIsPending] = useState(false);

  const [notice, setNotice] = useState<NoticeT>(undefined);
  const [images, setImages] = useState<ImageI[]>([]);

  // Use a ref for a unique ID counter that persists across renders
  const uniqueIdCounter = useRef(0);

  const [parentRef] = useAutoAnimate();

  useEffect(() => {
    const initialImages: ImageI[] = [];
    if (attributes.gallery.images && attributes.gallery.images.length > 0) {
      // Assuming gallery.images is an array of objects with 'media_id' and 'order_by'
      attributes.gallery.images
        .sort((a, b) => a.order_by - b.order_by)
        .forEach((imageItem: { media_id: number; order_by: number }) => {
          uniqueIdCounter.current += 1;
          initialImages.push({
            id: uniqueIdCounter.current,
            media_id: imageItem.media_id,
            order_by: imageItem.order_by,
          });
        });
    }

    setImages(initialImages);
  }, [attributes.gallery.images]);

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
        return { ...image, order_by: index + 1 };
      });
    setImages(newImages);
  };

  const saveChanges = async () => {
    setIsPending(true);
    const newGallery = {
      ...attributes.gallery,
      title: attributes.gallery.title,
      images: sortedImages.map((img) => {
        return {
          media_id: img.media_id,
          order_by: img.order_by,
        };
      }),
    };
    setAttributes({
      ...attributes,
      gallery: newGallery,
    });

    const apiGalleryImageIds = attributes.apiGallery.media_ids.split(',').map((id) => +id);

    const newGalleryImageIds = sortedImages.map((img) => +img.media_id);

    const sumArr = [...new Set([...newGalleryImageIds, ...apiGalleryImageIds])].filter((id) => id !== 0).join(',');
    try {
      console.log(
        "wpApiSettings.api_url + 'gallery/' + gallery.gallery_id",
        wpApiSettings.api_url + 'gallery/' + attributes.gallery.gallery_id,
      );
      const response = await fetch(wpApiSettings.api_url + 'gallery/' + attributes.gallery.gallery_id, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          title: attributes.apiGallery.title,
          media_ids: sumArr,
        }),
      });
      await response.json();
      setNotice('success');
      setTimeout(() => setNotice(undefined), 3000);
    } catch (err) {
      console.error('Failed to save changes:', err);
      setNotice('error');
      setTimeout(() => setNotice(undefined), 3000);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid gap-2">
      <section className="flex gap-1 flex-wrap justify-end items-center">
        <MediaUploadCheck>
          <MediaUpload
            // 1. Set `multiple` to true to allow multi-selection
            multiple={true}
            onSelect={(selectedMedia) => {
              // 2. `selectedMedia` will now be an array of media objects
              const newImagesToAdd: ImageI[] = selectedMedia.map((media: { id: number }) => {
                uniqueIdCounter.current += 1;
                return {
                  id: uniqueIdCounter.current, // Assign a unique client-side ID
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
            allowedTypes={['image']}
            render={({ open }) => {
              return (
                <Button style={{ height: '100%' }} onClick={open} variant="secondary" icon={'images-alt'}>
                  {'Dodaj zdjęcia'} {/* Changed text to plural */}
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
                      icon={'arrow-left-alt'}
                    />
                    <Button
                      disabled={image.order_by === images.length}
                      onClick={() => moveDown(image.order_by)}
                      icon={'arrow-right-alt'}
                    />
                  </div>
                  <Button icon={'trash'} onClick={() => removeImage(image.order_by)} />
                </div>
                <ImageComponent media_id={image.media_id} alt={'Zdjęcie gallerii'} style={{ aspectRatio: '16/9' }} />
              </section>
            </div>
          </div>
        ))}
      </section>
      <section className="flex gap-4 flex-wrap justify-between items-center">
        <div>
          {notice && (
            <Notice status={notice === 'success' ? 'success' : 'error'} isDismissible={false}>
              {notice === 'success' ? 'Aby zapisać zmiany Zapisz post' : 'Błąd zapisu'}
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

export default GalleryImages;
