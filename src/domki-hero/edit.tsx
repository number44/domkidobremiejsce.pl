import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { AttributesI, LinkI, SortableImageI } from './types';
import { PanelBody, Panel, PanelRow, TextControl, Button, Icon, CheckboxControl } from '@wordpress/components';
import ImageComponent from '@components/ImageComponent';
import LinkComponent from './components/LinkComponent';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import SortableImagesWithText from '@components/SortableImagesWithText';
import SortableLinks from '@components/SortablieLinks';

interface PropsI {
  attributes: AttributesI;
  isSelected: boolean;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, isSelected, setAttributes }: PropsI) {
  const [carouselImg, setCarouselImg] = useState(0);

  const nextImage = () => {
    if (carouselImg === attributes.images.length - 1) {
      setCarouselImg(0);
    } else {
      setCarouselImg(carouselImg + 1);
    }
  };
  const prevImage = () => {
    if (carouselImg === 0) {
      setCarouselImg(attributes.images.length - 1);
    } else {
      setCarouselImg(carouselImg - 1);
    }
  };
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
                  allowedTypes={['image']}
                  render={({ open }) => {
                    if (attributes.logo.media_id) {
                      return (
                        <div style={imageWrapperStyles} onClick={open}>
                          <ImageComponent
                            media_id={attributes.logo.media_id}
                            alt={attributes.logo.alt}
                            style={imageStyles}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <Button onClick={open} className="components-panel__body__toggle" icon={'images-alt'}>
                          {'Wybierz obraz'}
                        </Button>
                      );
                    }
                  }}
                />
              </MediaUploadCheck>
            </PanelRow>
          </PanelBody>
          <PanelBody title="Menu - linki" initialOpen={false}>
            <SortableLinks attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>
          <PanelBody title="Karuzela-autoplay" initialOpen={false}>
            <TextControl
              label="Czas w milisekundach"
              value={attributes.carousel.autoplay}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  carousel: {
                    ...attributes.carousel,
                    autoplay: value,
                  },
                });
              }}
            />
            <CheckboxControl
              label="Loop"
              checked={attributes.carousel.loop}
              onChange={(value) =>
                setAttributes({
                  ...attributes,
                  carousel: {
                    ...attributes.carousel,
                    loop: value,
                  },
                })
              }
            />
          </PanelBody>
          <PanelBody title="Karuzela-zdjęcia" initialOpen={false}>
            <SortableImagesWithText attributes={attributes} setAttributes={setAttributes} />
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
                __next40pxDefaultSize
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
                __next40pxDefaultSize
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
                label="Text"
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
                label="Link"
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
        </Panel>
      </InspectorControls>
      <div {...useBlockProps()}>
        <div className="container  hide-on-small">
          <div className="left">
            <div className="hero-logo rounded overflow-hidden">
              <ImageComponent media_id={attributes.logo.media_id} alt={attributes.logo.alt} />
            </div>
            <div className="menu">
              <ul className="menu-fixed-ul">
                {attributes.links.map((link, index) => (
                  <li key={index}>
                    <a href="#">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="right-top flex justify-between">
              <section className="hero-buttons  btn-grp gap-4">
                <a title="Zarezerwuj" href="#" className="reset-reservation cp btn-fix btn btn-d btn-primary">
                  {attributes.reservation.text}
                </a>
                <a title="Zadzwoń" href="#" className="btn cp btn-l btn-secondary">
                  <svg width={18} height={22} viewBox="0 0 18 22" fill="none">
                    <path
                      d="M18 16.4022V20.724C18.0001 21.0334 17.9042 21.3314 17.7316 21.5578C17.559 21.7842 17.3225 21.9221 17.07 21.9438C16.633 21.9804 16.276 22 16 22C7.16299 22 0 13.2452 0 2.44444C0 2.10711 0.015 1.67078 0.0459999 1.13667C0.0637223 0.827987 0.176581 0.539013 0.361803 0.328055C0.547025 0.117097 0.790822 -0.000139863 1.044 3.13597e-07H4.57999C4.70403 -0.000153187 4.82369 0.0560499 4.91572 0.157692C5.00775 0.259333 5.06559 0.399157 5.07799 0.55C5.10099 0.831111 5.12199 1.05478 5.14199 1.22467C5.34073 2.9198 5.748 4.56846 6.34999 6.11478C6.44499 6.35922 6.38299 6.65133 6.20299 6.80778L4.04499 8.69245C5.36445 12.4501 7.81454 15.4447 10.889 17.0573L12.429 14.4247C12.4919 14.3171 12.5838 14.24 12.6885 14.2067C12.7932 14.1734 12.9041 14.1861 13.002 14.2426C14.267 14.9769 15.6156 15.4735 17.002 15.7153C17.141 15.7398 17.324 15.7667 17.552 15.7936C17.6752 15.809 17.7894 15.8798 17.8723 15.9923C17.9553 16.1047 18.0011 16.2508 18.001 16.4022H18Z"
                      fill="black"
                    ></path>
                  </svg>
                  <span>{attributes.phone.text}</span>
                </a>
              </section>
              <section className="hero-socials flex align-center gap-2 px-2">
                <a title="facebook link" href="#" className="c">
                  <img src={wpApiSettings.theme_url + '/assets/icons/facebook.svg'} alt="facebook-icon" />
                </a>
                <a title="instagram link" href="#">
                  <img src={wpApiSettings.theme_url + '/assets/icons/instagram.svg'} alt="instagram-icon" />
                </a>
              </section>
            </div>
            <section className="right-content">
              <div className="carousel-box">
                <div
                  className="embla"
                  data-carousel-autoplay={attributes.carousel.autoplay}
                  data-carousel-loop={attributes.carousel.loop}
                >
                  <div className="embla__viewport">
                    <div className="embla__container">
                      {/* <?php foreach ($attributes['images'] as $image): ?>
									<div className="embla__slide">
										<?php echo my_lazy_load_image($image['media_id'], "carousel"); ?>
										<h1 className="embla__slide-text">
											<?php echo $image['text']; ?>
										</h1>
									</div>
								<?php endforeach; ?> */}
                      <ImageComponent
                        media_id={attributes.images[carouselImg].media_id}
                        alt={attributes.images[carouselImg].alt}
                      />
                      {/* {attributes.images.map((image, index) => (
                        <div key={index} className="embla__slide">
                          <ImageComponent media_id={image.media_id} alt={image.alt} />
                        </div>
                      ))} */}
                    </div>
                  </div>
                  <div className="embla__buttons">
                    <div title="prev-button" onClick={prevImage} className="embla__button embla__button--prev">
                      <img src={wpApiSettings.theme_url + '/assets/icons/arrow-icon.svg'} alt="" />
                    </div>
                    <div title="next-button" onClick={nextImage} className="embla__button embla__button--next">
                      <img src={wpApiSettings.theme_url + '/assets/icons/arrow-icon.svg'} alt="" />
                    </div>
                  </div>
                  <div className="embla__dots"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <section className="carousel-mobile hide-on-large">
          <div className="carousel-box">
            <div
              className="embla"
              data-carousel-autoplay={attributes.carousel.autoplay}
              data-carousel-loop={attributes.carousel.loop}
            >
              <div className="embla__viewport">
                <div className="embla__container">
                  <ImageComponent
                    media_id={attributes.images[carouselImg].media_id}
                    alt={attributes.images[carouselImg].alt}
                  />
                </div>
              </div>
              <div className="embla__buttons">
                <div title="prev-button" onClick={prevImage} className="embla__button embla__button--prev">
                  <img src={wpApiSettings.theme_url + '/assets/icons/arrow-icon.svg'} alt="" />
                </div>
                <div title="next-button" onClick={nextImage} className="embla__button embla__button--next">
                  <img src={wpApiSettings.theme_url + '/assets/icons/arrow-icon.svg'} alt="" />
                </div>
              </div>
              <div className="embla__dots"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const imageWrapperStyles: CSSProperties = {
  width: '100%',
  backgroundColor: '#434343',
  aspectRatio: '4/3',
  position: 'relative',
  display: 'grid',
  placeContent: 'center',
};

const imageStyles: CSSProperties = {
  width: '100',
  aspectRatio: '4/3',
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
};
