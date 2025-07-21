import { RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import React, { Fragment, CSSProperties, useState } from 'react';
import { AttributesI } from '../types';

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
  isOpen: boolean;
}
const Privacy = ({ attributes, setAttributes, isSelected, isOpen }: PropsI) => {
  return (
    <Fragment>
      <div
        className="privacy"
        style={{
          transition: 'clip-path ease-in-out.3s  ,opacity 0.3s ease-in-out',
          clipPath: !isOpen
            ? 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
            : 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          opacity: !isOpen ? '0' : '1',
        }}
      >
        <RichText
          value={attributes.privacy.text}
          onChange={(value) => {
            setAttributes({
              ...attributes,
              privacy: {
                ...attributes.privacy,
                text: value,
              },
            });
          }}
        />
      </div>
    </Fragment>
  );
};
export default Privacy;
