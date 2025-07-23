import { Button, Modal, Spinner } from '@wordpress/components';
import { useState } from 'react';
import Gallery from './Gallery';
import { getHeaders } from '../helpers/http';

interface PropsI {
  gallery: {
    id: number;
    title: string;
    media_ids: string;
  };
  removeGallery: (id: number) => void;
}
const GalleryButton = ({ gallery, removeGallery }: PropsI) => {
  const [isModalOpen, toggleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const openModal = () => {
    toggleModal(true);
  };
  const closeModal = () => {
    toggleModal(false);
  };

  const deleteGalery = async () => {
    if (!window.confirm('Czy na pewno chcesz usunąć galerię?')) return;

    setIsPending(true);
    try {
      const response = await fetch(wpApiSettings.api_url + 'gallery/' + gallery.id, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const respJson = await response.json();
      removeGallery(gallery.id);
    } catch (error) {
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="paper pb-1">
        <div className="flex justify-between items-center">
          <div>{(isLoading || isPending) && <Spinner />}</div>
          <Button icon={'trash'} disabled={isPending} onClick={deleteGalery} />
        </div>
        <div className="px-1">
          <Button
            disabled={isPending}
            onClick={openModal}
            variant="secondary"
            className="flex justify-between items-center "
            style={{ width: '100%', textAlign: 'center', display: 'block' }}
          >
            {gallery.title}
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <Modal size="large" title={gallery.title} onRequestClose={closeModal}>
          <Gallery gallery={gallery} />
        </Modal>
      )}
    </>
  );
};
export default GalleryButton;
