import { __ } from "@wordpress/i18n";

import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor";
import { ApiGalleryI, AttributesI } from "./types";
import {
  Button,
  CheckboxControl,
  Modal,
  Panel,
  PanelBody,
  PanelRow,
  Spinner,
  TextControl,
} from "@wordpress/components";
import SortableImagesWithText from "@components/SortableImagesWithText";
import { useEffect, useState } from "react";
import { getHeaders } from "@/helpers/http";
import Category from "./components/Category";
import GalleryImages from "./components/GalleryImages";
import ImageComponent from "@components/ImageComponent";
import ButtonLink from "@components/ButtonLink";

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, setAttributes }: PropsI) {
  const blockProps = useBlockProps();
  const [isLoading, setIsLoading] = useState(true);
  const [galleryActive, setGallerysActive] = useState<number>(1);
  const [apiGalleries, setApiGalleries] = useState<ApiGalleryI[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchGalleries = async () => {
    try {
      const response = await fetch(wpApiSettings.api_url + "gallery", {
        method: "GET",
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const respJson = await response.json();
      setApiGalleries(respJson.data);
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
    <>
      <InspectorControls>
        <Panel>
          <PanelBody title="Identyfikator" initialOpen={false}>
            <TextControl
              label="Identyfikator"
              value={attributes.identifier}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  identifier: value,
                });
              }}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>
          <PanelBody title="Tutuł" initialOpen={false}>
            <TextControl
              value={attributes.title.text}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  title: {
                    ...attributes.title,
                    text: value,
                  },
                });
              }}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <CheckboxControl
              checked={attributes.title.show}
              label="Pokaż tytuł"
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  title: {
                    ...attributes.title,
                    show: value,
                  },
                });
              }}
            />
          </PanelBody>
          <PanelBody title="Atrakcje" initialOpen={false}>
            <SortableImagesWithText attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>
          <PanelBody title="Zdjęcia" initialOpen={false}>
            <Button
              className="w-full text-center flex justify-center items-center"
              onClick={() => setIsModalOpen(true)}
              variant="secondary"
            >
              Wybierz zdjęcia
            </Button>
            {isModalOpen && (
              <Modal size="large" title="Wybierz zdjęcia" onRequestClose={closeModal}>
                <GalleryImages
                  attributes={attributes}
                  setAttributes={setAttributes}
                  apiGalleries={apiGalleries}
                  gallery={attributes.gallery}
                />
              </Modal>
            )}
          </PanelBody>
          <PanelBody title="Zdjęcia przesuwane - Kategoria" initialOpen={false}>
            {isLoading && <Spinner />}
            {!isLoading && (
              <Category apiGalleries={apiGalleries} attributes={attributes} setAttributes={setAttributes} />
            )}
          </PanelBody>
          <PanelBody title="Pattern" initialOpen={false}>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  value={attributes.pattern.media_id}
                  onSelect={(media) => {
                    setAttributes({
                      ...attributes,
                      pattern: {
                        ...attributes.pattern,
                        media_id: media.id,
                        alt: media.alt,
                      },
                    });
                  }}
                  allowedTypes={["image"]}
                  render={({ open }) => {
                    if (attributes.pattern.media_id) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#434343",
                            aspectRatio: "4/3",
                            position: "relative",
                            display: "grid",
                            placeContent: "center",
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.pattern.media_id}
                            alt={attributes.pattern.alt}
                            style={{
                              width: "100",
                              aspectRatio: "4/3",
                              position: "absolute",
                              inset: 0,
                              objectFit: "cover",
                              height: "100%",
                            }}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <Button onClick={open} className="components-panel__body__toggle" icon={"images-alt"}>
                          {"Wybierz obraz"}
                        </Button>
                      );
                    }
                  }}
                />
              </MediaUploadCheck>
            </PanelRow>
          </PanelBody>
          <PanelBody title="Przycisk" initialOpen={false}>
            <ButtonLink attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>
        </Panel>
      </InspectorControls>
      <section {...blockProps} id={attributes.identifier}>
        <div className="container">
          {attributes.title.show && <h2 className="text-center mb-4">{attributes.title.text}</h2>}
          <div className="grid-3 gap-4 py-4 elements">
            {attributes.images.map((image, index) => (
              <div className="flex gap-3 items-center" key={index}>
                <ImageComponent media_id={image.media_id} />
                <h4 className="no-wrap contrast">{image.text}</h4>
              </div>
            ))}
          </div>
          <div className="grid-3 gap-3 my-4">
            {attributes.gallery.images.length > 0 &&
              attributes.gallery.images.map((gimage, index) => (
                <ImageComponent key={index} media_id={gimage.media_id} style={{ aspectRatio: "16/9" }} />
              ))}
          </div>
          {attributes.button.show && (
            <div className="flex justify-center items-center">
              <a href={attributes.button.link} className="button-md">
                <span>{attributes.button.text}</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
