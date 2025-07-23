import { __ } from '@wordpress/i18n';

import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { AttributesI } from './types';
import { CheckboxControl, Panel, PanelBody, TextControl } from '@wordpress/components';

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
              label="Identyfikator"
              value={attributes.identifier}
              onChange={(value) => {
                setAttributes({
                  ...attributes,
                  identifier: value,
                });
              }}
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
            />
            <CheckboxControl
              checked={attributes.title.show}
              label="Pokaż tytuł"
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

          <div className="my-5">
            <InnerBlocks />
          </div>
        </div>
      </section>
    </>
  );
}
