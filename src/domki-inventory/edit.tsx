import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Panel, PanelRow, TextControl, Button, SelectControl } from '@wordpress/components';
import './editor.scss';
import React, { Fragment, CSSProperties, useState } from 'react';
import { AspectRatioT, AttributesI } from './types';
import ImageComponent from '@components/ImageComponent';
const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/spacer', 'core/list'];

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
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
                  allowedTypes={['image']}
                  render={({ open }) => {
                    if (attributes.image_one.media_id) {
                      return (
                        <div
                          style={{
                            width: '100%',
                            backgroundColor: '#434343',
                            aspectRatio: attributes.image_one.aspect_ratio,
                            position: 'relative',
                            display: 'grid',
                            placeContent: 'center',
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.image_one.media_id}
                            alt={attributes.image_one.alt}
                            style={{
                              width: '100',
                              aspectRatio: '4/3',
                              position: 'absolute',
                              inset: 0,
                              objectFit: 'cover',
                              height: '100%',
                            }}
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
            <div style={{ display: 'grid', marginBlock: '.5rem' }}>
              <SelectControl
                label="Proporcje zdjęcia"
                value={attributes.image_one.aspect_ratio}
                options={[
                  { label: '16/9', value: '16/9' },
                  { label: '4/3', value: '4/3' },
                  { label: '1/1', value: '1/1' },
                  { label: '3/4', value: '3/4' },
                ]}
                onChange={(newSize) => {
                  const newAspect: AspectRatioT =
                    newSize === '16/9' || newSize === '4/3' || newSize === '1/1' || newSize === '3/4' ? newSize : '4/3';
                  setAttributes({
                    ...attributes,
                    image_one: {
                      ...attributes.image_one,
                      aspect_ratio: newAspect,
                    },
                  });
                }}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </div>
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
                  allowedTypes={['image']}
                  render={({ open }) => {
                    if (attributes.image_two.media_id) {
                      return (
                        <div
                          style={{
                            width: '100%',
                            backgroundColor: '#434343',
                            aspectRatio: attributes.image_two.aspect_ratio,
                            position: 'relative',
                            display: 'grid',
                            placeContent: 'center',
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.image_two.media_id}
                            alt={attributes.image_two.alt}
                            style={{
                              width: '100',
                              aspectRatio: '4/3',
                              position: 'absolute',
                              inset: 0,
                              objectFit: 'cover',
                              height: '100%',
                            }}
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
            <div style={{ display: 'grid', marginBlock: '.5rem' }}>
              <SelectControl
                label="Proporcje zdjęcia"
                value={attributes.image_two.aspect_ratio}
                options={[
                  { label: '16/9', value: '16/9' },
                  { label: '4/3', value: '4/3' },
                  { label: '1/1', value: '1/1' },
                  { label: '3/4', value: '3/4' },
                ]}
                onChange={(newSize) => {
                  const newAspect: AspectRatioT =
                    newSize === '16/9' || newSize === '4/3' || newSize === '1/1' || newSize === '3/4' ? newSize : '4/3';
                  setAttributes({
                    ...attributes,
                    image_two: {
                      ...attributes.image_two,
                      aspect_ratio: newAspect,
                    },
                  });
                }}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </div>
          </PanelBody>
          <PanelBody title="Zdjęcie 3" initialOpen={false}>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  value={attributes.image_three.media_id}
                  onSelect={(media) => {
                    setAttributes({
                      ...attributes,
                      image_three: {
                        ...attributes.image_three,
                        media_id: media.id,
                        alt: media.alt,
                      },
                    });
                  }}
                  allowedTypes={['image']}
                  render={({ open }) => {
                    if (attributes.image_three.media_id) {
                      return (
                        <div
                          style={{
                            width: '100%',
                            backgroundColor: '#434343',
                            aspectRatio: attributes.image_three.aspect_ratio,
                            position: 'relative',
                            display: 'grid',
                            placeContent: 'center',
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.image_three.media_id}
                            alt={attributes.image_three.alt}
                            style={{
                              width: '100',
                              aspectRatio: '4/3',
                              position: 'absolute',
                              inset: 0,
                              objectFit: 'cover',
                              height: '100%',
                            }}
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
            <div style={{ display: 'grid', marginBlock: '.5rem' }}>
              <SelectControl
                label="Proporcje zdjęcia"
                value={attributes.image_three.aspect_ratio}
                options={[
                  { label: '16/9', value: '16/9' },
                  { label: '4/3', value: '4/3' },
                  { label: '1/1', value: '1/1' },
                  { label: '3/4', value: '3/4' },
                ]}
                onChange={(newSize) => {
                  const newAspect: AspectRatioT =
                    newSize === '16/9' || newSize === '4/3' || newSize === '1/1' || newSize === '3/4' ? newSize : '4/3';
                  setAttributes({
                    ...attributes,
                    image_three: {
                      ...attributes.image_three,
                      aspect_ratio: newAspect,
                    },
                  });
                }}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </div>
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
                  allowedTypes={['image']}
                  render={({ open }) => {
                    if (attributes.pattern.media_id) {
                      return (
                        <div
                          style={{
                            width: '100%',
                            backgroundColor: '#434343',
                            aspectRatio: '4/3',
                            position: 'relative',
                            display: 'grid',
                            placeContent: 'center',
                          }}
                          onClick={open}
                        >
                          <ImageComponent
                            media_id={attributes.pattern.media_id}
                            alt={attributes.pattern.alt}
                            style={{
                              width: '100',
                              aspectRatio: '4/3',
                              position: 'absolute',
                              inset: 0,
                              objectFit: 'cover',
                              height: '100%',
                            }}
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
        </InspectorControls>
      </Panel>

      <article {...useBlockProps()}>
        <ImageComponent media_id={attributes.pattern.media_id} alt={attributes.pattern.alt} className="inv-pattern-1" />
        <div className="container">
          <section className="left">
            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
          </section>
          <section className="center">
            <ImageComponent
              media_id={attributes.pattern.media_id}
              alt={attributes.pattern.alt}
              className="inv-pattern-1"
            />
            <ImageComponent
              media_id={attributes.image_one.media_id}
              alt={attributes.image_one.alt}
              style={{ aspectRatio: attributes.image_one.aspect_ratio }}
              className="sticky"
            />
          </section>
          <section className="right">
            <ImageComponent
              media_id={attributes.image_two.media_id}
              alt={attributes.image_two.alt}
              style={{ aspectRatio: attributes.image_two.aspect_ratio }}
            />
            <ImageComponent
              media_id={attributes.image_three.media_id}
              alt={attributes.image_three.alt}
              style={{ aspectRatio: attributes.image_three.aspect_ratio }}
            />
          </section>
        </div>
      </article>
    </Fragment>
  );
}
const btnStyle: CSSProperties = {
  background: '#144D29',
  color: '#fff',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '.3rem',
};
const btnPrimary: CSSProperties = {
  color: 'white',
  background: '#144D29',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '30rem',
};
const btnSecondary: CSSProperties = {
  color: '#144D29',
  background: '#E4F5EB',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '30rem',
};
const ImagePlaceholder: CSSProperties = {
  boxShadow: '0px 0px 3px #434343',
  borderRadius: '.5rem',
  background: '#ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
};
const deleteBtn: CSSProperties = {
  background: 'darkred',
  color: '#fff',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '.3rem',
  padding: '.5rem 2rem',
  cursor: 'pointer',
};

{
  /* <div className="placeholder" style={{ aspectRatio: '4/8' }}>
<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	strokeWidth={1.5}
	stroke="currentColor"
	className="w-6 h-6"
>
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
	/>
</svg>
</div> */
}
