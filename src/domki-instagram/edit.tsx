import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, Panel, PanelRow, TextControl, Button } from "@wordpress/components";
import "./editor.scss";
import React, { Fragment, CSSProperties, useState } from "react";
import InstagramIcon from "./components/InstagramIcon";
import { AttributesI } from "./types";
const ALLOWED_BLOCKS = ["core/heading", "core/paragraph", "core/spacer", "core/list"];

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
        </InspectorControls>
      </Panel>

      <div {...useBlockProps()}>
        <section className="insta">
          <div className="insta-head">
            <InstagramIcon />

            <h1 id="hashtag">#{attributes.title}</h1>
          </div>
          <div className="container text-center d-block">
            <InnerBlocks />
          </div>
        </section>
      </div>
    </Fragment>
  );
}
const btnStyle: CSSProperties = {
  background: "#144D29",
  color: "#fff",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3rem",
};
const btnPrimary: CSSProperties = {
  color: "white",
  background: "#144D29",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "30rem",
};
const btnSecondary: CSSProperties = {
  color: "#144D29",
  background: "#E4F5EB",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "30rem",
};
const ImagePlaceholder: CSSProperties = {
  boxShadow: "0px 0px 3px #434343",
  borderRadius: ".5rem",
  background: "#ccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  cursor: "pointer",
};
const deleteBtn: CSSProperties = {
  background: "darkred",
  color: "#fff",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3rem",
  padding: ".5rem 2rem",
  cursor: "pointer",
};
