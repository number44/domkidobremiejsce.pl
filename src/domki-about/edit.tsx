import { __ } from "@wordpress/i18n";

import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import { AttributesI } from "./types";
import {
  Button,
  Panel,
  PanelBody,
  PanelRow,
  TextControl,
} from "@wordpress/components";
import ImageComponent from "@components/ImageComponent";
const ALLOWED_BLOCKS = [
  "core/heading",
  "core/paragraph",
  "core/spacer",
  "core/list",
];

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
            />
          </PanelBody>
          <PanelBody title="Zdjęcie 1" initialOpen={false}>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  value={attributes.image_one.media_id}
                  onSelect={(media) => {
                    setAttributes({
                      ...attributes,
                      image_one: {
                        ...attributes.image_one,
                        media_id: media.id,
                        alt: media.alt,
                      },
                    });
                  }}
                  allowedTypes={["image"]}
                  render={({ open }) => {
                    if (attributes.image_one.media_id) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#434343",
                            aspectRatio: "384/560",
                            position: "relative",
                            display: "grid",
                            placeContent: "center",
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.image_one.media_id}
                            alt={attributes.image_one.alt}
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
                        <Button
                          onClick={open}
                          className="components-panel__body__toggle"
                          icon={"images-alt"}
                        >
                          {"Wybierz obraz"}
                        </Button>
                      );
                    }
                  }}
                />
              </MediaUploadCheck>
            </PanelRow>
          </PanelBody>
          <PanelBody title="Zdjęcie 2" initialOpen={false}>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  value={attributes.image_two.media_id}
                  onSelect={(media) => {
                    setAttributes({
                      ...attributes,
                      image_two: {
                        ...attributes.image_two,
                        media_id: media.id,
                        alt: media.alt,
                      },
                    });
                  }}
                  allowedTypes={["image"]}
                  render={({ open }) => {
                    if (attributes.image_two.media_id) {
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
                            media_id={attributes.image_two.media_id}
                            alt={attributes.image_two.alt}
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
                        <Button
                          onClick={open}
                          className="components-panel__body__toggle"
                          icon={"images-alt"}
                        >
                          {"Wybierz obraz"}
                        </Button>
                      );
                    }
                  }}
                />
              </MediaUploadCheck>
            </PanelRow>
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
                        <Button
                          onClick={open}
                          className="components-panel__body__toggle"
                          icon={"images-alt"}
                        >
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
        <div className="container">
          <div className="left">
            <div className="img-about_one">
              <ImageComponent
                media_id={attributes.pattern.media_id}
                alt={attributes.pattern.alt}
                className="pattern"
              />
              <ImageComponent
                media_id={attributes.image_one.media_id}
                alt={attributes.image_one.alt}
                style={{ aspectRatio: "384/560" }}
              />
            </div>
          </div>
          <div className="right">
            <div className="prose">
              <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
            </div>
            <ImageComponent
              media_id={attributes.image_two.media_id}
              alt={attributes.image_two.alt}
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
