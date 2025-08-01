import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, Panel, PanelRow, TextControl, Button, CheckboxControl } from "@wordpress/components";
// import SearchControl from '@wordpress/components/src/search-control';
// import { useSelect } from '@wordpress/data';
import "./editor.scss";
import React, { Fragment, CSSProperties, useState, useEffect } from "react";
import LinkComponent from "./components/LinkComponent";
import { AttributesI } from "./types";
import ImageComponent from "@/components/ImageComponent";
import SortableLinks from "@components/SortablieLinks";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
  return (
    <Fragment>
      <InspectorControls>
        <Panel>
          <PanelBody title="Fixed" initialOpen={false}>
            <CheckboxControl
              label="Fixed"
              checked={attributes.fixed}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  fixed: value,
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
                            aspectRatio: "4/3",
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
          <PanelBody title="Socials" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="Facebook Id"
                value={attributes.facebook}
                onChange={(value) =>
                  setAttributes({
                    ...attributes,
                    facebook: value,
                  })
                }
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Instagram Id"
                value={attributes.instagram}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    instagram: value,
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Telefon" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="Numer wyświetlany"
                value={attributes.phone.text}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    phone: {
                      ...attributes.phone,
                      text: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Numer z prefix"
                value={attributes.phone.url}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    phone: {
                      ...attributes.phone,
                      url: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Rezerwacja" initialOpen={false}>
            <PanelRow>
              <TextControl
                label={"Text"}
                value={attributes.reservation.text}
                onChange={(value) =>
                  setAttributes({
                    ...attributes,
                    reservation: {
                      ...attributes.reservation,
                      text: value,
                    },
                  })
                }
              />
            </PanelRow>

            <PanelRow>
              <TextControl
                label={"Link"}
                value={attributes.reservation.url}
                onChange={(value) =>
                  setAttributes({
                    ...attributes,
                    reservation: {
                      ...attributes.reservation,
                      url: value,
                    },
                  })
                }
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Mobile" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="Nazwa"
                value={attributes.mobile.line_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    mobile: {
                      ...attributes.mobile,
                      line_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Miejscowość"
                value={attributes.mobile.line_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    mobile: {
                      ...attributes.mobile,
                      line_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Tekst przycisku rezerwacji"
                value={attributes.mobile.reservation_text}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    mobile: {
                      ...attributes.mobile,
                      reservation_text: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Menu - linki" initialOpen={false}>
            <SortableLinks attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>
        </Panel>
      </InspectorControls>
      <div {...useBlockProps()}>
        <div className="scroll-indicator" style={{ background: "#144D29" }}></div>
        <header className="header">
          <div className="menu-btn">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M5.33325 8.00008C5.33325 7.64646 5.47373 7.30732 5.72378 7.05727C5.97382 6.80722 6.31296 6.66675 6.66659 6.66675H25.3333C25.6869 6.66675 26.026 6.80722 26.2761 7.05727C26.5261 7.30732 26.6666 7.64646 26.6666 8.00008C26.6666 8.3537 26.5261 8.69284 26.2761 8.94289C26.026 9.19294 25.6869 9.33341 25.3333 9.33341H6.66659C6.31296 9.33341 5.97382 9.19294 5.72378 8.94289C5.47373 8.69284 5.33325 8.3537 5.33325 8.00008Z"
                fill="#144D29"
              ></path>
              <path
                d="M5.33325 24.0001C5.33325 23.6465 5.47373 23.3073 5.72378 23.0573C5.97382 22.8072 6.31296 22.6667 6.66659 22.6667H25.3333C25.6869 22.6667 26.026 22.8072 26.2761 23.0573C26.5261 23.3073 26.6666 23.6465 26.6666 24.0001C26.6666 24.3537 26.5261 24.6928 26.2761 24.9429C26.026 25.1929 25.6869 25.3334 25.3333 25.3334H6.66659C6.31296 25.3334 5.97382 25.1929 5.72378 24.9429C5.47373 24.6928 5.33325 24.3537 5.33325 24.0001Z"
                fill="#144D29"
              ></path>
              <path
                d="M6.66659 14.6667C6.31296 14.6667 5.97382 14.8072 5.72378 15.0573C5.47373 15.3073 5.33325 15.6465 5.33325 16.0001C5.33325 16.3537 5.47373 16.6928 5.72378 16.9429C5.97382 17.1929 6.31296 17.3334 6.66659 17.3334H17.3333C17.6869 17.3334 18.026 17.1929 18.2761 16.9429C18.5261 16.6928 18.6666 16.3537 18.6666 16.0001C18.6666 15.6465 18.5261 15.3073 18.2761 15.0573C18.026 14.8072 17.6869 14.6667 17.3333 14.6667H6.66659Z"
                fill="#144D29"
              ></path>
            </svg>
          </div>
          <div className="brand">
            <ImageComponent media_id={attributes.logo.media_id} alt={attributes.logo.alt} />
          </div>
          <div className="btn-grp">
            <div className="btn btn-primary">{attributes.reservation.text}</div>
            <div className="btn btn-secondary">{attributes.phone.text}</div>
          </div>
          <div className="socials">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.434 8.324v1.653h-1.21v2.02h1.21V18h2.487v-6.004h1.668s.157-.968.232-2.028h-1.89v-1.38c0-.207.27-.485.54-.485h1.353V6h-1.842c-2.61 0-2.548 2.022-2.548 2.324z"
                fill="#144D29"
              ></path>
              <path
                d="M12 21.6a9.6 9.6 0 100-19.2 9.6 9.6 0 000 19.2zm0 2.4C5.372 24 0 18.628 0 12S5.372 0 12 0s12 5.372 12 12-5.372 12-12 12z"
                fill="#144D29"
              ></path>
            </svg>
            <svg width="24" height="24" fill="none">
              <path
                d="M11.99 5.818A6.167 6.167 0 007.634 7.62a6.148 6.148 0 000 8.701 6.168 6.168 0 008.715 0 6.148 6.148 0 000-8.701 6.167 6.167 0 00-4.357-1.802zm0 10.149a4.007 4.007 0 01-2.83-1.171 3.994 3.994 0 012.83-6.824c1.063 0 2.08.421 2.832 1.17a3.994 3.994 0 010 5.654c-.751.75-1.77 1.17-2.831 1.17zM18.397 7.026a1.436 1.436 0 10-1.437-1.434c0 .792.644 1.434 1.437 1.434z"
                fill="#144D29"
              ></path>
              <path
                d="M23.364 4.133A6.126 6.126 0 0019.855.631a8.816 8.816 0 00-2.913-.56C15.658.017 15.252 0 11.997 0 8.743 0 8.326 0 7.053.072c-.995.02-1.98.208-2.91.559a6.132 6.132 0 00-3.51 3.502 8.75 8.75 0 00-.558 2.909C.017 8.322 0 8.728 0 11.979c0 3.25 0 3.663.075 4.937.02.995.208 1.977.558 2.91a6.134 6.134 0 003.51 3.502c.93.364 1.915.566 2.913.599C8.339 23.983 8.746 24 12 24c3.255 0 3.672 0 4.945-.073a8.827 8.827 0 002.913-.558 6.15 6.15 0 003.509-3.503c.35-.932.538-1.914.558-2.91.058-1.28.075-1.685.075-4.936 0-3.25 0-3.663-.075-4.937a8.746 8.746 0 00-.56-2.95zm-1.623 12.684a6.702 6.702 0 01-.415 2.246 3.972 3.972 0 01-2.281 2.277 6.653 6.653 0 01-2.226.414c-1.266.058-1.623.073-4.87.073-3.249 0-3.58 0-4.87-.073a6.621 6.621 0 01-2.225-.414 3.979 3.979 0 01-2.291-2.277 6.75 6.75 0 01-.415-2.22c-.057-1.265-.07-1.621-.07-4.863 0-3.243 0-3.574.07-4.864a6.695 6.695 0 01.415-2.244 3.977 3.977 0 012.29-2.279 6.686 6.686 0 012.225-.413c1.268-.058 1.623-.074 4.871-.074s3.581 0 4.87.074c.76.009 1.513.149 2.226.413a3.987 3.987 0 012.281 2.279 6.75 6.75 0 01.415 2.22c.057 1.266.072 1.621.072 4.864 0 3.242 0 3.59-.057 4.862h-.015v-.001z"
                fill="#144D29"
              ></path>
            </svg>
          </div>
        </header>
      </div>
    </Fragment>
  );
}
const btnStyle: CSSProperties = {
  background: "#144D29",
  color: "#fff",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3rem",
};
const blockStyle = {
  backgroundImage: `url($./domki-navbar.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};
