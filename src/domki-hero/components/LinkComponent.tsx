import { PanelRow, TabPanel, CardDivider, TextControl, Button } from '@wordpress/components';
import React, { useMemo, CSSProperties } from 'react';
import { AttributesI, LinkI } from '../types';
interface PropsI {
  link: LinkI;
  setAttributes: (attributes: AttributesI) => void;
  attributes: AttributesI;
}

const LinkComponent = ({ link, setAttributes, attributes }: PropsI) => {
  const index = useMemo(() => attributes.links.findIndex((l) => l === link), [link]);
  const deleteLink = () => {
    const filteredArr = attributes.links.filter((l) => l !== link);
    setAttributes({
      ...attributes,
      links: [...filteredArr],
    });
  };
  return (
    <div style={LinkComponentStyles}>
      <TextControl
        label={'Text'}
        value={link.text}
        onChange={(value) => {
          setAttributes({
            ...attributes,
            links: [
              ...attributes.links.slice(0, index),
              { ...attributes.links[index], text: value },
              ...attributes.links.slice(index + 1),
            ],
          });
        }}
      />
      <TextControl
        label={'Link'}
        value={link.url}
        onChange={(value) => {
          setAttributes({
            ...attributes,
            links: [
              ...attributes.links.slice(0, index),
              { ...attributes.links[index], url: value },
              ...attributes.links.slice(index + 1),
            ],
          });
        }}
      />
      <Button style={btnStyle} onClick={deleteLink}>
        Skasuj
      </Button>
      <CardDivider />
    </div>
  );
};
export default LinkComponent;
const LinkComponentStyles: CSSProperties = {
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
};
const btnStyle: CSSProperties = {
  background: 'darkred',
  color: '#fff',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '.3rem',
};
