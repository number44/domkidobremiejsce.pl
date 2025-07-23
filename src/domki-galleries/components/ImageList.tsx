import React, { CSSProperties } from 'react';
import { AttributesI } from '../types';

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
const ImageList = ({ attributes, setAttributes }: PropsI) => {
  return (
    <div style={styles}>
      {attributes.galleries.map((gallery) => {
        return <h1>{gallery.title}</h1>;
      })}
      <h1>ImageList</h1>
    </div>
  );
};
export default ImageList;

const styles: CSSProperties = {};
