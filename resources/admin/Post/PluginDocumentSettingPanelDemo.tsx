import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { TextControl, PanelRow, Spinner, Button } from '@wordpress/components';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { getHeaders } from '../helpers/http';

interface MyCustomFieldsPluginProps {}

interface GalleryI {
  id: number;
  title: string;
  media_ids: string;
}
const PluginDocumentSettingPanelDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [galleries, setGalleries] = useState<GalleryI[]>([]);

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

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <PluginDocumentSettingPanel name="custom-panel" title="Galerie" className="custom-panel">
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: 'center' }}>
          {galleries.map((gallery) => (
            <PanelRow key={gallery.id}>
              <Button variant="secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                {gallery.title}
              </Button>
            </PanelRow>
          ))}
        </div>
      )}
    </PluginDocumentSettingPanel>
  );
};
export default PluginDocumentSettingPanelDemo;

// Register the plugin to add the panel
