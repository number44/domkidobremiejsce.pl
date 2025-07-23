import { CSSProperties, useMemo } from 'react';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Panel, PanelRow, TextControl, Button, Icon } from '@wordpress/components';
import ImageComponent from '@components/ImageComponent';

export interface SortableImageI {
  media_id: number;
  text: string;
  alt: string;
  order_by: number;
}

interface AttributesI {
  [key: string]: any;
  images: SortableImageI[];
}
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: any) => void;
}

const SortableImagesWithText = ({ attributes, setAttributes }: PropsI) => {
  const sortedImages = useMemo(() => {
    const sortedByOrderBy = attributes.images.sort((a, b) => {
      return a.order_by - b.order_by;
    });
    return sortedByOrderBy;
  }, [attributes.images]);
  const addImage = () => {
    setAttributes({
      ...attributes,
      images: [...attributes.images, { media_id: 0, text: '', alt: '', order_by: attributes.images.length + 1 }],
    });
  };
  const changeImage = (image: SortableImageI, media_id: number, alt: string) => {
    const newImages = attributes.images.map((img) => {
      if (img.order_by === image.order_by) {
        return {
          ...img,
          media_id,
          alt,
        };
      }
      return img;
    });
    setAttributes({
      ...attributes,
      images: newImages,
    });
  };
  const changeText = (image: SortableImageI, text: string) => {
    const newImages = attributes.images.map((img) => {
      if (img.order_by === image.order_by) {
        return {
          ...img,
          text,
        };
      }
      return img;
    });
    setAttributes({
      ...attributes,
      images: newImages,
    });
  };

  const moveUp = (image: SortableImageI) => {
    if (image.order_by === 1) return;

    const newImages = attributes.images.map((img) => {
      if (img.order_by === image.order_by) {
        return {
          ...img,
          order_by: image.order_by - 1,
        };
      }
      if (img.order_by === image.order_by - 1) {
        return {
          ...img,
          order_by: image.order_by,
        };
      }
      return img;
    });
    setAttributes({
      ...attributes,
      images: [...newImages],
    });
  };

  const moveDown = (image: SortableImageI) => {
    if (image.order_by === attributes.images.length) return;
    const newImages = attributes.images.map((img) => {
      if (img.order_by === image.order_by) {
        return {
          ...img,
          order_by: image.order_by + 1,
        };
      }
      if (img.order_by === image.order_by + 1) {
        return {
          ...img,
          order_by: image.order_by,
        };
      }
      return img;
    });

    setAttributes({
      ...attributes,
      images: [...newImages],
    });
  };
  const deleteImage = (image: SortableImageI) => {
    const newImages = attributes.images
      .filter((img) => img.order_by !== image.order_by)
      .sort((a, b) => {
        return a.order_by - b.order_by;
      })
      .map((img, index) => {
        return {
          ...img,
          order_by: index + 1,
        };
      });

    setAttributes({
      ...attributes,
      images: [...newImages],
    });
  };

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {sortedImages.map((image, key) => (
          <div key={key} style={{ display: 'grid', gap: '1rem', border: 'solid 1px #ccc', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Button onClick={() => moveUp(image)} disabled={image.order_by === 1} icon={'arrow-up-alt'} />
                <Button
                  onClick={() => moveDown(image)}
                  disabled={image.order_by === attributes.images.length}
                  icon={'arrow-down-alt'}
                />
              </div>
              <Button icon={'trash'} onClick={() => deleteImage(image)} />
            </div>
            <MediaUploadCheck>
              <MediaUpload
                value={image.media_id}
                onSelect={(media) => {
                  changeImage(image, media.id, media.alt);
                }}
                allowedTypes={['image']}
                render={({ open }) => {
                  if (image.media_id) {
                    return (
                      <div style={imageWrapperStyles} onClick={open}>
                        <ImageComponent media_id={image.media_id} alt={image.alt} style={imageStyles} />
                      </div>
                    );
                  } else {
                    return (
                      <div onClick={open} style={imageWrapperStyles}>
                        <Button
                          className="components-panel__body__toggle"
                          icon={'images-alt'}
                          style={{ color: '#fff' }}
                        >
                          {'Wybierz obraz'}
                        </Button>
                      </div>
                    );
                  }
                }}
              />
            </MediaUploadCheck>
            <TextControl
              value={image.text}
              onChange={(value) => {
                changeText(image, value);
              }}
              __next40pxDefaultSize
            />
          </div>
        ))}
      </div>
      <Button onClick={addImage} variant="secondary" style={btnStyle}>
        Dodaj
      </Button>
    </div>
  );
};
export default SortableImagesWithText;
const btnStyle: CSSProperties = {
  background: '#144D29',
  color: '#fff',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '.3rem',
};

const imageWrapperStyles: CSSProperties = {
  width: '100%',
  backgroundColor: '#434343',
  aspectRatio: '4/3',
  position: 'relative',
  display: 'grid',
  placeContent: 'center',
};

const imageStyles: CSSProperties = {
  width: '100',
  aspectRatio: '4/3',
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  height: '100%',
};
