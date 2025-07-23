import { __ } from '@wordpress/i18n';
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
  useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, Panel, PanelRow, TextControl, Button, ExternalLink, Icon } from '@wordpress/components';
import './editor.scss';
import React, { Fragment, CSSProperties, useState } from 'react';
import Privacy from './components/Privacy';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import ImageComponent from '@components/ImageComponent';
import { AttributesI } from './types';
const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/spacer', 'core/list'];
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
  const [isOpen, setIsOpen] = useState(false);
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
          <PanelBody title="Logo">
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
                            media_id={attributes.logo.media_id}
                            alt={attributes.logo.alt}
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
          <PanelBody title="Tytuł" initialOpen={false}>
            <PanelRow>
              <TextControl
                value={attributes.title}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    title: value,
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Regulamin" initialOpen={false}>
            <TextControl
              value={attributes.rules}
              onChange={(values) => {
                setAttributes({
                  ...attributes,
                  rules: values,
                });
              }}
            />
          </PanelBody>
        </InspectorControls>
      </Panel>
      <div {...useBlockProps()}>
        <Privacy attributes={attributes} isOpen={isOpen} setAttributes={setAttributes} isSelected={isSelected} />
        <div
          style={{
            alignSelf: 'stretch',
            placeSelf: 'stretch',
            width: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className=""
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Icon icon={'privacy'} size={32} />
          </div>
        </div>
        <div
          style={{
            opacity: isOpen ? 0 : 1,
            clipPath: isOpen
              ? 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
              : 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          }}
          className={isSelected ? 'sector sector-active left' : 'sector left'}
        >
          <RichText
            value={attributes.left}
            onChange={(value) => {
              setAttributes({
                ...attributes,
                left: value,
              });
            }}
          />
        </div>
        <div
          style={{
            opacity: isOpen ? 0 : 1,
            clipPath: isOpen
              ? 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
              : 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          }}
          className={isSelected ? 'sector sector-active center' : 'sector center'}
        >
          <RichText
            value={attributes.center}
            onChange={(value) => {
              setAttributes({
                ...attributes,
                center: value,
              });
            }}
          />
        </div>
        <div
          style={{
            opacity: isOpen ? 0 : 1,
            clipPath: isOpen
              ? 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
              : 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          }}
          className={isSelected ? 'sector sector-active right' : 'sector right'}
        >
          <RichText
            value={attributes.right}
            onChange={(value) => {
              setAttributes({
                ...attributes,
                right: value,
              });
            }}
          />
        </div>
      </div>
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
