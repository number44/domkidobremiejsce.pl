import { __ } from "@wordpress/i18n";

import { InspectorControls, PanelColorSettings, useBlockProps } from "@wordpress/block-editor";
import { ApiGalleryI, AttributesI } from "./types";
import { CheckboxControl, Panel, PanelBody, RangeControl, TextControl } from "@wordpress/components";
import { useEffect, useMemo, useState } from "react";
import Categories from "./components/Categories";
import Gallery from "./components/Gallery";
import { getHeaders } from "@/helpers/http";
import ImageComponent from "@components/ImageComponent";

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, setAttributes }: PropsI) {
  const blockProps = useBlockProps();
  const [isLoading, setIsLoading] = useState(true);
  const [galleryActive, setGallerysActive] = useState<number>(1);
  const [apiGalleries, setApiGalleries] = useState<ApiGalleryI[]>([]);

  const sortedGalleries = useMemo(() => {
    return attributes.galleries.sort((a, b) => a.order_by - b.order_by);
  }, [attributes.galleries]);
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
              value={attributes.identifier}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  identifier: value,
                });
              }}
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

          {sortedGalleries.length > 0 &&
            !isLoading &&
            sortedGalleries.map((gallery) => (
              <PanelBody key={gallery.order_by} title={gallery.title} initialOpen={false}>
                <Gallery
                  apiGalleries={apiGalleries}
                  gallery={gallery}
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              </PanelBody>
            ))}

          <PanelBody title="Zdjęcia przesuwane - Kategorie" initialOpen={false}>
            <div className="grid gap-2 py-2">
              <Categories apiGalleries={apiGalleries} attributes={attributes} setAttributes={setAttributes} />
            </div>
          </PanelBody>
          <PanelBody title="Przycisk" initialOpen={false}>
            <TextControl
              label="Tekst"
              value={attributes.button.text}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  button: {
                    ...attributes.button,
                    text: value,
                  },
                });
              }}
            />
            <TextControl
              label="Link"
              value={attributes.button.link}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  button: {
                    ...attributes.button,
                    link: value,
                  },
                });
              }}
            />
            <CheckboxControl
              checked={attributes.button.show}
              label="Pokaż przycisk"
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  button: {
                    ...attributes.button,
                    show: value,
                  },
                });
              }}
            />
          </PanelBody>
          <PanelBody title="Liczba dodatkowych zdjęć" initialOpen={false}>
            <RangeControl
              value={attributes.per_page}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  per_page: value ? value : 2,
                });
              }}
            />
          </PanelBody>
        </Panel>
      </InspectorControls>
      <section {...blockProps} id={attributes.identifier}>
        <div className="container">
          {attributes.title.show && <h2 className="text-center">{attributes.title.text}</h2>}
          <section className="flex justify-center items-center gap-3 my-5 flex-wrap">
            {!isLoading &&
              sortedGalleries.map((button) => (
                <div key={button.order_by} className="button-small" onClick={() => setGallerysActive(button.order_by)}>
                  {button.title}
                </div>
              ))}
          </section>
          <div>
            {!isLoading &&
              sortedGalleries
                .filter((gallery) => gallery.order_by === galleryActive)
                .map((gallery) => (
                  <section key={gallery.order_by} className="grid-3 gap-3 my-4">
                    {gallery.images.map((image) => (
                      <div key={image.order_by}>
                        <ImageComponent media_id={image.media_id} style={{ aspectRatio: "16/9" }} />
                      </div>
                    ))}
                  </section>
                ))}
          </div>
          {attributes.button.show && (
            <div className="flex justify-center items-center">
              <a href={attributes.button.link} onClick={(e) => e.preventDefault()} className="button-md">
                <span>{attributes.button.text}</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
