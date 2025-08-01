import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, Panel, PanelRow, TextControl, DatePicker } from "@wordpress/components";
import "./editor.scss";
import React, { useRef, Fragment, CSSProperties, useState } from "react";
import { AttributesI } from "./types";
const ALLOWED_BLOCKS = ["core/heading", "core/paragraph", "core/spacer", "core/list"];
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
  const [priceType, setPriceType] = useState(1);
  const ThemeUrl = wpApiSettings.theme_url;

  // const onSelectIcon1 = (image: MediaImageI) => {
  // 	setAttributes({
  // 		...attributes,
  // 		image_2: {
  // 			id: image.id,
  // 			url: image.url,
  // 			alt: image.alt,
  // 			thumbnail: image.sizes.thumbnail ? image.sizes.thumbnail.url : image.sizes.full.url,
  // 			medium: image.sizes.medium ? image.sizes.medium.url : image.sizes.full.url,
  // 			large: image.sizes.large ? image.sizes.large.url : image.sizes.full.url,
  // 			full: image.sizes.full.url,
  // 		},
  // 	})
  // }
  const [date, setDate] = useState(new Date());
  const sixPeopleIconUrl = ThemeUrl + "/assets/icons/6x_ludzikow.svg";
  const eightPeopleIconUrl = ThemeUrl + "/assets/icons/8x_ludzikow.svg";

  return (
    <Fragment>
      <Panel>
        <InspectorControls>
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
          <PanelBody title="Tytuł" initialOpen={false}>
            <TextControl
              value={attributes.title}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  title: value,
                });
              }}
            />
          </PanelBody>
          <PanelBody title="Promocja 1" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="tekst linia pierwsza"
                value={attributes.promo_1.line_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_1: {
                      ...attributes.promo_1,
                      line_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="tekst linia druga"
                value={attributes.promo_1.line_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_1: {
                      ...attributes.promo_1,
                      line_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(image: MediaImageI) => {
                    setAttributes({
                      ...attributes,
                      promo_1: {
                        ...attributes.promo_1,
                        img_id: image.id,
                        url: image.url,
                      },
                    });
                  }}
                  value={attributes.promo_1.img_id}
                  render={({ open }) =>
                    attributes.promo_1.url.length > 1 ? (
                      <div
                        onClick={open}
                        style={{
                          cursor: "pointer",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                        }}
                      >
                        <img
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          src={attributes.promo_1.url}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          cursor: "pointer",
                          marginBottom: "2rem",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                          display: "grid",
                          placeContent: "center",
                        }}
                        onClick={open}
                      >
                        <svg
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#434343"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )
                  }
                />
              </MediaUploadCheck>
            </PanelRow>
            <PanelRow>
              <span>Od :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_1.from}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_1: {
                      ...attributes.promo_1,
                      from: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <span>Do :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_1.to}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_1: {
                      ...attributes.promo_1,
                      to: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 6 osób"
                value={attributes.promo_1.price_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_1: {
                      ...attributes.promo_1,
                      price_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 8 osób"
                value={attributes.promo_1.price_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_1: {
                      ...attributes.promo_1,
                      price_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Promocja 2" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="tekst linia pierwsza"
                value={attributes.promo_2.line_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_2: {
                      ...attributes.promo_2,
                      line_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="tekst linia druga"
                value={attributes.promo_2.line_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_2: {
                      ...attributes.promo_2,
                      line_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(image: MediaImageI) => {
                    setAttributes({
                      ...attributes,
                      promo_2: {
                        ...attributes.promo_2,
                        img_id: image.id,
                        url: image.url,
                      },
                    });
                  }}
                  value={attributes.promo_2.img_id}
                  render={({ open }) =>
                    attributes.promo_2.url.length > 1 ? (
                      <div
                        onClick={open}
                        style={{
                          cursor: "pointer",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                        }}
                      >
                        <img
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          src={attributes.promo_2.url}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          cursor: "pointer",
                          marginBottom: "2rem",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                          display: "grid",
                          placeContent: "center",
                        }}
                        onClick={open}
                      >
                        <svg
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#434343"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )
                  }
                />
              </MediaUploadCheck>
            </PanelRow>
            <PanelRow>
              <span>Od :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_2.from}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_2: {
                      ...attributes.promo_2,
                      from: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <span>Do :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_2.to}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_2: {
                      ...attributes.promo_2,
                      to: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 6 osób"
                value={attributes.promo_2.price_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_2: {
                      ...attributes.promo_2,
                      price_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 8 osób"
                value={attributes.promo_2.price_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_2: {
                      ...attributes.promo_2,
                      price_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Promocja 3" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="tekst linia pierwsza"
                value={attributes.promo_3.line_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_3: {
                      ...attributes.promo_3,
                      line_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="tekst linia druga"
                value={attributes.promo_3.line_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_3: {
                      ...attributes.promo_3,
                      line_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(image: MediaImageI) => {
                    setAttributes({
                      ...attributes,
                      promo_3: {
                        ...attributes.promo_3,
                        img_id: image.id,
                        url: image.url,
                      },
                    });
                  }}
                  value={attributes.promo_3.img_id}
                  render={({ open }) =>
                    attributes.promo_3.url.length > 1 ? (
                      <div
                        onClick={open}
                        style={{
                          cursor: "pointer",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                        }}
                      >
                        <img
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          src={attributes.promo_3.url}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          cursor: "pointer",
                          marginBottom: "2rem",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                          display: "grid",
                          placeContent: "center",
                        }}
                        onClick={open}
                      >
                        <svg
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#434343"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )
                  }
                />
              </MediaUploadCheck>
            </PanelRow>
            <PanelRow>
              <span>Od :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_3.from}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_3: {
                      ...attributes.promo_3,
                      from: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <span>Do :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_3.to}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_3: {
                      ...attributes.promo_3,
                      to: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 6 osób"
                value={attributes.promo_3.price_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_3: {
                      ...attributes.promo_3,
                      price_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 8 osób"
                value={attributes.promo_3.price_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_3: {
                      ...attributes.promo_3,
                      price_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Promocja 4" initialOpen={false}>
            <PanelRow>
              <TextControl
                label="tekst linia pierwsza"
                value={attributes.promo_4.line_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_4: {
                      ...attributes.promo_4,
                      line_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="tekst linia druga"
                value={attributes.promo_4.line_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_4: {
                      ...attributes.promo_4,
                      line_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(image: MediaImageI) => {
                    setAttributes({
                      ...attributes,
                      promo_4: {
                        ...attributes.promo_4,
                        img_id: image.id,
                        url: image.url,
                      },
                    });
                  }}
                  value={attributes.promo_4.img_id}
                  render={({ open }) =>
                    attributes.promo_4.url.length > 1 ? (
                      <div
                        onClick={open}
                        style={{
                          cursor: "pointer",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                        }}
                      >
                        <img
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          src={attributes.promo_4.url}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          cursor: "pointer",
                          marginBottom: "2rem",
                          boxShadow: "0px 0px 3px #ddd",
                          marginInline: "auto",
                          aspectRatio: "4/4",
                          width: "fit-content",
                          borderRadius: "50%",
                          padding: "1rem",
                          display: "grid",
                          placeContent: "center",
                        }}
                        onClick={open}
                      >
                        <svg
                          style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#434343"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )
                  }
                />
              </MediaUploadCheck>
            </PanelRow>
            <PanelRow>
              <span>Od :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_4.from}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_4: {
                      ...attributes.promo_4,
                      from: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <span>Do :</span>
              <input
                type="date"
                name="begin"
                placeholder="dd-mm-yyyy"
                value={attributes.promo_4.to}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_4: {
                      ...attributes.promo_4,
                      to: value.target.value,
                    },
                  });
                }}
                min="2022-01-01"
                max="2070-12-31"
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 6 osób"
                value={attributes.promo_4.price_1}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_4: {
                      ...attributes.promo_4,
                      price_1: value,
                    },
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Cena dla 8 osób"
                value={attributes.promo_4.price_2}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    promo_4: {
                      ...attributes.promo_4,
                      price_2: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Przycisk">
            <PanelRow>
              <TextControl
                label="text"
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
            </PanelRow>
            <PanelRow>
              <TextControl
                label="url"
                value={attributes.button.url}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    button: {
                      ...attributes.button,
                      url: value,
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </Panel>

      <div {...useBlockProps()} id={attributes.identifier}>
        <section className="oferta-section" id={attributes.identifier}>
          <div className="container">
            <h1 id="oferta-target">{attributes.title}</h1>
            <div className="of">
              <RichText
                tagName="p"
                value={attributes.promotion_text}
                onChange={(content) => setAttributes({ ...attributes, promotion_text: content })}
                allowedFormats={["core/bold", "core/italic"]}
                placeholder={__("...dodaj treść tutaj")}
                className="oferta"
              />
            </div>

            <div className="btns">
              <div
                onClick={() => setPriceType(1)}
                className={
                  priceType === 1
                    ? "btn cp btn-left oferta6 btn-oferta btn--active"
                    : "btn cp btn-left oferta6 btn-oferta"
                }
              >
                <div className="circle"></div>
                <div>DO 6 OSÓB</div>
                <img src={sixPeopleIconUrl} alt="oferta 6 osób" />
              </div>
              <div
                onClick={() => setPriceType(2)}
                className={
                  priceType === 2
                    ? "btn cp btn-right oferta8 btn-oferta btn--active"
                    : "btn cp btn-right oferta8 btn-oferta"
                }
              >
                <div className="circle"></div>
                <div>DO 8 OSÓB</div>
                <img loading="lazy" src={eightPeopleIconUrl} alt="oferta 8 osób" />
              </div>
            </div>

            <div className="oferty">
              {/* Promo 1 */}
              <div className="oferta-1 promocja">
                <h4>{attributes.promo_1.line_1}</h4>
                <p>{attributes.promo_1.line_2}</p>
                <div className="icona over-hidden">
                  <img loading="lazy" src={attributes.promo_1.url} alt="promo 1 icon" />
                </div>
                <div className="cena" data-cena-1={attributes.promo_1.price_1} data-cena-2={attributes.promo_1.price_2}>
                  {priceType === 1 ? attributes.promo_1.price_1 : attributes.promo_1.price_2}
                </div>
                <div
                  data-start={attributes.promo_1.from}
                  data-finish={attributes.promo_1.to}
                  className="btn ucase cp btn-g-fix"
                >
                  Rezerwuj
                </div>
              </div>

              {/* Promo 2 */}
              <div className="oferta-2 promocja">
                <h4>{attributes.promo_2.line_1}</h4>
                <p>{attributes.promo_2.line_2}</p>
                <div className="icona over-hidden">
                  <img loading="lazy" src={attributes.promo_2.url} alt="promo 2 icon" />
                </div>
                <div className="cena" data-cena-1={attributes.promo_2.price_1} data-cena-2={attributes.promo_2.price_2}>
                  {priceType === 1 ? attributes.promo_2.price_1 : attributes.promo_2.price_2}
                </div>
                <div
                  data-start={attributes.promo_2.from}
                  data-finish={attributes.promo_2.to}
                  className="btn ucase cp btn-g-fix"
                >
                  Rezerwuj
                </div>
              </div>

              {/* Promo 3 */}
              <div className="oferta-3 promocja">
                <h4>{attributes.promo_3.line_1}</h4>
                <p>{attributes.promo_3.line_2}</p>
                <div className="icona over-hidden">
                  <img loading="lazy" src={attributes.promo_3.url} alt="promo 3 icon" />
                </div>
                <div className="cena" data-cena-1={attributes.promo_3.price_1} data-cena-2={attributes.promo_3.price_2}>
                  {priceType === 1 ? attributes.promo_3.price_1 : attributes.promo_3.price_2}
                </div>
                <div
                  data-start={attributes.promo_3.from}
                  data-finish={attributes.promo_3.to}
                  className="btn ucase cp btn-g-fix"
                >
                  Rezerwuj
                </div>
              </div>

              {/* Promo 4 */}
              <div className="oferta-4 promocja">
                <h4>{attributes.promo_4.line_1}</h4>
                <p>{attributes.promo_4.line_2}</p>
                <div className="icona over-hidden">
                  <img loading="lazy" src={attributes.promo_4.url} alt="promo 4 icon" />
                </div>
                <div className="cena" data-cena-1={attributes.promo_4.price_1} data-cena-2={attributes.promo_4.price_2}>
                  {priceType === 1 ? attributes.promo_4.price_1 : attributes.promo_4.price_2}
                </div>
                <div
                  data-start={attributes.promo_4.from}
                  data-finish={attributes.promo_4.to}
                  className="btn ucase cp btn-g-fix"
                >
                  Rezerwuj
                </div>
              </div>
            </div>

            <div className="content text-center">
              <RichText
                tagName="div" // Changed to div to match render.php's direct output (though RichText usually uses p)
                value={attributes.reservation_text}
                onChange={(content) => setAttributes({ ...attributes, reservation_text: content })}
                placeholder={__("...dodaj treść tutaj")}
              />
            </div>

            <div data-href={attributes.button.url} className="btn-text button button-reservation-clear no-wrap">
              {attributes.button.text}
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

const promoStyle: CSSProperties = {
  background: "#FC7846",
  padding: "0.0rem 1rem",
  color: "white",
  borderRadius: "50rem",
  fontWeight: 900,
  width: "fit-content",
  marginInline: "auto",
};
const btnStyle: CSSProperties = {
  background: "#144D29",
  color: "#fff",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3rem",
};
const btnPrimary: CSSProperties = {
  color: "white",
  background: "#144D29",
  paddingBlock: "1rem",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "30rem",
  marginTop: "2rem",
  textTransform: "uppercase",
  fontWeight: 900,
};
const btnSecondary: CSSProperties = {
  color: "#144D29",
  background: "#E4F5EB",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "30rem",
};
const ImagePlaceholder: CSSProperties = {
  boxShadow: "0px 0px 3px #434343",
  borderRadius: ".5rem",
  background: "#ccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  minWidth: "fit-content",
  cursor: "pointer",
};
const deleteBtn: CSSProperties = {
  background: "darkred",
  color: "#fff",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3rem",
  padding: ".5rem 2rem",
  cursor: "pointer",
};
