import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { TextControl, PanelRow, Spinner, Button, PanelBody, Modal } from '@wordpress/components';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { getHeaders } from '../helpers/http';
import GalleryButton from './GalleryButton';
import NewGallery from './NewGallery';
import { GalleryI } from '../types';

interface MyCustomFieldsPluginProps {}

const GalleryPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [galleries, setGalleries] = useState<GalleryI[]>([]);

  const removeGallery = (id: number) => {
    const newGalleries = galleries.filter((g) => g.id != id);
    setGalleries(newGalleries);
  };
  const fetchGalleries = async () => {
    try {
      const response = await fetch(wpApiSettings.api_url + 'gallery', {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const respJson = await response.json();

      setGalleries(respJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addGallery = async (gallery: GalleryI) => {
    setGalleries([...galleries, gallery]);
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <PluginDocumentSettingPanel name="custom-panel" title="Galerie" className="custom-panel">
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: 'center' }} className="">
          {galleries.map((gallery) => (
            <PanelRow key={gallery.id}>
              <GalleryButton removeGallery={removeGallery} gallery={gallery} />
            </PanelRow>
          ))}
          <NewGallery addGallery={addGallery} />
        </div>
      )}
    </PluginDocumentSettingPanel>
  );
};
export default GalleryPanel;
