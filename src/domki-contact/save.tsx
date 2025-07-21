import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import React from 'react';
interface PropsI {
  attributes: AttributesI;
}
const ThemeUrl = window.location.protocol + '//' + window.location.host + '/wp-content/themes/miejscedobre';
const PageUrl = window.location.protocol + '//' + window.location.host;

export default function save({ attributes }: PropsI) {
  return (
    <section id={attributes.identifier} {...useBlockProps.save()}>
      <div className="container">
        <h1 id="kontakt-target" className="text-center kontakt-title">
          {attributes.title}
        </h1>
        <div className="grid-contact">
          <div className="contact-text inner-block">
            <div dangerouslySetInnerHTML={{ __html: attributes.content }}></div>
          </div>
          <div className="contact-form ">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </section>
  );
}
