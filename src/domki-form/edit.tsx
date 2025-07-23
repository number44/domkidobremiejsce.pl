import { __ } from '@wordpress/i18n';

import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { AttributesI } from './types';
import { CheckboxControl, Panel, PanelBody, TextControl } from '@wordpress/components';
const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/spacer', 'core/list'];
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, setAttributes }: PropsI) {
  const blockProps = useBlockProps();

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
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>
          <PanelBody title="Tutuł" initialOpen={false}>
            <TextControl
              value={attributes.title.text}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  title: {
                    ...attributes.title,
                    text: value,
                  },
                });
              }}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <CheckboxControl
              checked={attributes.title.show}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  title: {
                    ...attributes.title,
                    show: value,
                  },
                });
              }}
            />
          </PanelBody>
        </Panel>
      </InspectorControls>
      <section {...blockProps}>
        <div className="container">
          {attributes.title.show && <h2 className="text-center">{attributes.title.text}</h2>}
          <div className="content">
            <div className="left">
              <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
            </div>
            <div className="right">
              <form className="form">Formularz</form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
