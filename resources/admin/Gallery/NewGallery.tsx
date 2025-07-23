import { Button, Modal, TextControl } from '@wordpress/components';
import { useEffect, useState } from 'react';
import { getHeaders } from '../helpers/http';
import { GalleryI } from '../types';

interface PropsI {
  addGallery: (gallery: GalleryI) => void;
}
const NewGallery = ({ addGallery }: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryName, setGalleryName] = useState('');
  const [isPending, setIsPending] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (galleryName.length > 3) {
      setIsPending(false);
    } else {
      setIsPending(true);
    }
  }, [galleryName]);
  const addNewGallery = async () => {
    setIsPending(true);
    try {
      const response = await fetch(wpApiSettings.api_url + 'gallery', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title: galleryName,
          media_ids: [],
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const respJson = await response.json();
      addGallery({
        id: respJson.data,
        title: galleryName,
        media_ids: '',
      });
    } catch (error) {
      throw error;
    } finally {
      setTimeout(() => {
        setIsPending(false);
      }, 100);
      setGalleryName('');
      closeModal();
    }
  };
  return (
    <>
      <Button className="grid-1 w-full text-center place-center mb-2" onClick={() => setIsModalOpen(true)}>
        Dodaj Galerię
      </Button>
      {isModalOpen && (
        <Modal title="Nowa Galeria" onRequestClose={closeModal}>
          <div className="grid gap-1">
            <TextControl
              placeholder="Nazwa Galerii"
              value={galleryName}
              onChange={(value) => setGalleryName(value)}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <Button variant="secondary" disabled={isPending} onClick={addNewGallery}>
              Dodaj galerię
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewGallery;
