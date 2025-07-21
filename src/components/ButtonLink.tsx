import { CheckboxControl, TextControl } from '@wordpress/components';
import React, { CSSProperties } from 'react';
interface AttributesI {
  button: ButtonI;
  [key: string]: any;
}
interface ButtonI {
  text: string;
  link: string;
  show: boolean;
}

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: any) => void;
}
const ButtonLink = ({ attributes, setAttributes }: PropsI) => {
  return (
    <div className="grid-1 gap-1">
      <TextControl
        label="Tekst przycisku"
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
        __next40pxDefaultSize
        __nextHasNoMarginBottom
      />
      <TextControl
        value={attributes.button.link}
        label="Link do strony"
        onChange={(value) => {
          setAttributes({
            ...attributes,
            button: {
              ...attributes.button,
              link: value,
            },
          });
        }}
        __next40pxDefaultSize
        __nextHasNoMarginBottom
      />

      <CheckboxControl
        checked={attributes.button.show}
        label="Pokaż przycisk"
        onChange={(value) => {
          setAttributes({
            ...attributes,
            button: {
              ...attributes.button,
              show: value,
            },
          });
        }}
      />
    </div>
  );
};
export default ButtonLink;

const styles: CSSProperties = {};
