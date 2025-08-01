import { __ } from "@wordpress/i18n";

import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor";
import { AttributesI } from "./types";
import { Button, CheckboxControl, Panel, PanelBody, PanelRow, TextControl } from "@wordpress/components";
import ImageComponent from "@components/ImageComponent";
const ALLOWED_BLOCKS = ["core/heading", "core/paragraph", "core/spacer", "core/list"];
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, setAttributes }: PropsI) {
  const blockProps = useBlockProps();

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
          <PanelBody title="Logo" initialOpen={false}>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  value={attributes.logo.media_id}
                  onSelect={(media) => {
                    setAttributes({
                      ...attributes,
                      logo: {
                        ...attributes.logo,
                        media_id: media.id,
                        alt: media.alt,
                      },
                    });
                  }}
                  allowedTypes={["image"]}
                  render={({ open }) => {
                    if (attributes.logo.media_id) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#434343",
                            aspectRatio: "1",
                            position: "relative",
                            display: "grid",
                            placeContent: "center",
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.logo.media_id}
                            alt={attributes.logo.alt}
                            style={{
                              width: "100",
                              aspectRatio: "1",
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
        </Panel>
      </InspectorControls>
      <section {...blockProps} id={attributes.identifier}>
        <div className="container mb-4">
          {attributes.title.show && <h2 className="text-center mb-4">{attributes.title.text}</h2>}
          <div className="content my-4">
            <section className="left">
              <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
            </section>
            <section className="right">
              {/* The form structure in edit.tsx is simplified as its interactive logic
                            is primarily handled by `@wordpress/interactivity` in render.php.
                            We're replicating the visual structure for the editor. */}
              <form className="form grid gap-2">
                <div className="grid-3 gap-4 flex-wrap">
                  <section className="grid">
                    <label htmlFor="firstname">Imię</label>
                    <input type="text" name="firstname" id="firstname" />
                    <div className="error"></div>
                  </section>
                  <section className="grid">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <div className="error"></div>
                  </section>
                  <section className="grid">
                    <label htmlFor="phone">Telefon (opcjonalne)</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]+" />
                    <div className="error"></div>
                  </section>
                </div>
                <div className="grid">
                  <label htmlFor="message">Wiadomość</label>
                  <textarea id="message" name="message" placeholder="Wiadomość" rows={8} cols={10}></textarea>
                  <div className="error"></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <input type="checkbox" name="consent" id="consent" />
                  <label htmlFor="consent">
                    Oświadczam, że zapoznałem się i akceptuję treść <a href="#">Polityki Prywatności</a>
                  </label>
                  <div className="error w-full grow"></div>
                </div>
                <div className="grid place-center">
                  <button type="submit" className="button-md">
                    <span>Wyślij</span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
