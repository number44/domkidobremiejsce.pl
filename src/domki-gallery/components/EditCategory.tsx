import { useEffect, useMemo, useState } from 'react';
import { ApiGalleryI, AttributesI, GalleryI } from '../types';
import { Button, Modal, SelectControl, TextControl } from '@wordpress/components';
interface PropsI {
  gallery: GalleryI;
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  moveUp: (order_by: number) => void;
  moveDown: (order_by: number) => void;
  removeGallery: (order_by: number) => void;
  apiGalleries: ApiGalleryI[];
}
const GalleryOption = ({
  attributes,
  setAttributes,
  gallery,
  moveUp,
  moveDown,
  removeGallery,
  apiGalleries,
}: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editedCategory, setEditedCategory] = useState<GalleryI>({
    title: gallery.title,
    order_by: gallery.order_by,
    gallery_id: gallery.gallery_id,
    images: gallery.images,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isDisabled = useMemo(() => {
    return !editedCategory.title || !editedCategory.gallery_id;
  }, [editedCategory]);
  const saveGallery = () => {
    const newGalleries = attributes.galleries.map((category) => {
      if (category.order_by === gallery.order_by) {
        return {
          ...category,
          ...editedCategory,
        };
      }
      return category;
    });
    setAttributes({
      ...attributes,
      galleries: newGalleries,
    });

    closeModal();
  };
  return (
    <>
      <div className="paper grid-1 ">
        <section className="flex justify-between items-center">
          <div className="flex">
            <Button disabled={gallery.order_by === 1} icon={'arrow-up-alt'} onClick={() => moveUp(gallery.order_by)} />
            <Button
              disabled={gallery.order_by === attributes.galleries.length}
              icon={'arrow-down-alt'}
              onClick={() => moveDown(gallery.order_by)}
            />
          </div>
          <div>
            <Button icon={'trash'} onClick={() => removeGallery(gallery.order_by)} />
          </div>
        </section>
        <section className="grid-1 px-1 py-1">
          <Button onClick={() => setIsModalOpen(true)} variant="secondary">
            {gallery.title}
          </Button>
        </section>
      </div>
      {isModalOpen && (
        <Modal title={gallery.title} size="medium" onRequestClose={closeModal}>
          <div className="grid-1 gap-2">
            <TextControl
              value={editedCategory.title}
              onChange={(value) => {
                setEditedCategory({
                  ...editedCategory,
                  title: value,
                });
              }}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
            <SelectControl
              label="Galeria Przesuwana"
              options={[
                {
                  value: '',
                  label: 'Wybierz galerię',
                },
                ...apiGalleries.map((gallery) => ({
                  value: gallery.id.toString(),
                  label: gallery.title,
                })),
              ]}
              value={editedCategory.gallery_id.toString()}
              onChange={(value) => {
                const selectedApiGallery = apiGalleries.find((gallery) => gallery.id.toString() === value);
                setEditedCategory({
                  ...editedCategory,
                  title: selectedApiGallery?.title || '',
                  gallery_id: +value,
                });
              }}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
            <Button disabled={isDisabled} variant="secondary" className="w-full grid" onClick={() => saveGallery()}>
              Zapisz
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
export default GalleryOption;
