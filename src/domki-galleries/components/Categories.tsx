import { useEffect, useMemo, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AttributesI, ApiGalleryI, GalleryI } from '../types';
import EditCategory from './EditCategory';
import { Button, Modal, TextControl } from '@wordpress/components';
import { closeModal } from '@wordpress/edit-post/store/actions';
import AddCategory from './AddCategory';
import { getHeaders } from '@/helpers/http';
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  apiGalleries: ApiGalleryI[];
}
const Categories = ({ attributes, setAttributes, apiGalleries }: PropsI) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!apiGalleries.length) return;
    setIsLoading(false);
  }, [apiGalleries]);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const sortedCategories = useMemo(() => {
    return attributes.galleries
      .sort((a, b) => a.order_by - b.order_by)
      .map((g, i) => {
        return {
          ...g,
          index: i + 1,
        };
      });
  }, [attributes.galleries]);

  const moveUp = (order_by: number) => {
    if (order_by === 1) return;
    const newImages = sortedCategories
      .map((image) => {
        if (image.order_by === order_by) {
          return {
            ...image,
            order_by: image.order_by - 1,
          };
        } else if (image.order_by === order_by - 1) {
          return {
            ...image,
            order_by: image.order_by + 1,
          };
        }
        return image;
      })
      .sort((a, b) => a.order_by - b.order_by);
    setAttributes({
      ...attributes,
      galleries: newImages,
    });
  };
  const moveDown = (order_by: number) => {
    if (order_by === sortedCategories.length) return;
    const newImages = sortedCategories
      .map((image) => {
        if (image.order_by === order_by) {
          return {
            ...image,
            order_by: image.order_by + 1,
          };
        } else if (image.order_by === order_by + 1) {
          return {
            ...image,
            order_by: image.order_by - 1,
          };
        }
        return image;
      })
      .sort((a, b) => a.order_by - b.order_by);
    setAttributes({
      ...attributes,
      galleries: newImages,
    });
  };
  const removeGallery = (order_by: number) => {
    if (!window.confirm('Czy na pewno chcesz usunąć galerię?')) return;
    const newGalleries = sortedCategories
      .filter((gallery) => gallery.order_by !== order_by)
      .map((gallery, index) => {
        return {
          ...gallery,
          order_by: index + 1,
        };
      });
    setAttributes({
      ...attributes,
      galleries: newGalleries,
    });
  };
  return (
    <>
      <div className="grid gap-1">
        {sortedCategories.map((gallery) => (
          <div key={gallery.order_by}>
            <EditCategory
              apiGalleries={apiGalleries}
              gallery={gallery}
              attributes={attributes}
              setAttributes={setAttributes}
              moveDown={moveDown}
              moveUp={moveUp}
              removeGallery={removeGallery}
            />
          </div>
        ))}
      </div>
      <div className="grid-gap-1">
        <Button disabled={isLoading} onClick={() => setIsModalOpen(true)}>
          Dodaj Kategorię
        </Button>
        {isModalOpen && (
          <Modal title="Nowa Kategoria" size="medium" onRequestClose={closeModal}>
            <AddCategory
              apiGalleries={apiGalleries}
              attributes={attributes}
              setAttributes={setAttributes}
              closeModal={closeModal}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default Categories;
