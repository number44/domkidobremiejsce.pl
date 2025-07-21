import React, { CSSProperties, useEffect, useState } from 'react';
import { ApiGalleryI, AttributesI, GalleryI } from '../types';
import { Button, Modal, Spinner } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import GalleryImages from './GalleryImages';
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  gallery: GalleryI;
  apiGalleries: ApiGalleryI[];
}
const Gallery = ({ attributes, setAttributes, gallery, apiGalleries }: PropsI) => {
  const [apiGallery, setApiGallery] = useState<ApiGalleryI | null>(null);
  const [newMediaId, setNewMediaId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  useEffect(() => {
    const selectedApiGallery = apiGalleries.find((apiGallery) => +apiGallery.id === +gallery.gallery_id);
    if (!selectedApiGallery) return;
    setApiGallery(selectedApiGallery);
    setIsLoading(false);
  }, []);

  useEffect(() => {}, [apiGallery]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  if (isLoading || !apiGallery) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="grid gap-2 py-2">
      <Button variant="secondary" onClick={openModal}>
        Edytuj Zdjęcia
      </Button>
      {isModalOpen && (
        <Modal title="Edytuj Zdjęcia" size="large" onRequestClose={closeModal}>
          <GalleryImages
            gallery={gallery}
            attributes={attributes}
            setAttributes={setAttributes}
            apiGalleries={apiGalleries}
          />
        </Modal>
      )}
    </div>
  );
};
export default Gallery;

const styles: CSSProperties = {};
