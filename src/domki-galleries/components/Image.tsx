import React, { CSSProperties } from 'react';
import { AttributesI } from '../types';
import { Button } from '@wordpress/components';

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  moveUp: (order_by: number) => void;
  moveDown: (order_by: number) => void;
  removeImage: (order_by: number) => void;
  image: {
    media_id: number;
    order_by: number;
  };
  images: {
    media_id: number;
    order_by: number;
  }[];
}
const Image = ({ attributes, setAttributes, moveDown, moveUp, removeImage, image, images }: PropsI) => {
  return (
    <div className="paper flex flex-col justify-center items-center px-2 pb-1">
      <section className="grid-1">
        <div className="flex justify-between items-center">
          <div className="flex gap1">
            <Button disabled={image.order_by === 1} onClick={() => moveUp(image.order_by)} icon={'arrow-left-alt'} />
            <Button
              disabled={image.order_by === images.length}
              onClick={() => moveDown(image.order_by)}
              icon={'arrow-right-alt'}
            />
          </div>
          <Button icon={'trash'} onClick={() => removeImage(image.order_by)} />
        </div>
      </section>
    </div>
  );
};
export default Image;

const styles: CSSProperties = {};
