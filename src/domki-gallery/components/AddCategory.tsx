import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { ApiGalleryI, AttributesI, GalleryI } from '../types';
import { Button, SelectControl, TextControl } from '@wordpress/components';
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  closeModal: () => void;
  apiGalleries: ApiGalleryI[];
}
const AddCategory = ({ attributes, setAttributes, closeModal, apiGalleries }: PropsI) => {
  const [newGallery, setNewGallery] = useState<GalleryI>({
    title: '',
    order_by: attributes.galleries.length + 1,
    gallery_id: 0,
    images: [],
  });

  const isDisabled = useMemo(() => {
    return !newGallery.title || !newGallery.gallery_id;
  }, [newGallery]);
  const saveGallery = () => {
    const newGalleries = [
      ...attributes.galleries,
      {
        ...newGallery,
        order_by: attributes.galleries.length + 1,
      },
    ];
    setAttributes({
      ...attributes,
      galleries: newGalleries,
    });
    closeModal();
  };
  return (
    <div className="grid gap-1">
      <TextControl
        value={newGallery.title}
        label="Nazwa galerii"
        onChange={(value) => {
          setNewGallery({
            ...newGallery,
            title: value,
          });
        }}
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
        value={newGallery.gallery_id.toString()}
        onChange={(value) => {
          const selectedApiGallery = apiGalleries.find((gallery) => gallery.id.toString() === value);
          setNewGallery({
            ...newGallery,
            title: selectedApiGallery?.title || '',
            gallery_id: +value,
          });
        }}
      />
      <Button disabled={isDisabled} variant="secondary" className="w-full grid" onClick={() => saveGallery()}>
        Zapisz
      </Button>
    </div>
  );
};
export default AddCategory;

const styles: CSSProperties = {};
