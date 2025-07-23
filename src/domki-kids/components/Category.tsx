import React, { CSSProperties, useState } from 'react';
import { ApiGalleryI, AttributesI } from '../types';
import { Button, Modal, SelectControl, TextControl } from '@wordpress/components';
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  apiGalleries: ApiGalleryI[];
}
const Category = ({ attributes, setAttributes, apiGalleries }: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="paper grid-1 ">
        <section className="grid-1 px-1 py-1">
          <Button onClick={() => setIsModalOpen(true)} variant="secondary">
            {attributes.apiGallery.title}
          </Button>
        </section>
      </div>
      {isModalOpen && (
        <Modal title="Kategoria zdjęć" size="medium" onRequestClose={closeModal}>
          <div className="grid-1 gap-2">
            <TextControl
              value={attributes.apiGallery.title}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  apiGallery: {
                    ...attributes.apiGallery,
                    title: value,
                  },
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
              value={attributes.apiGallery.id.toString()}
              onChange={(value) => {
                const selectedApiGallery = apiGalleries.find((gallery) => gallery.id.toString() === value);
                setAttributes({
                  ...attributes,
                  apiGallery: {
                    ...attributes.apiGallery,
                    title: selectedApiGallery?.title || '',
                    id: +value,
                  },
                  gallery: {
                    ...attributes.gallery,
                    gallery_id: +value,
                  },
                });
              }}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </Modal>
      )}
    </>
  );
};
export default Category;

const styles: CSSProperties = {};
