import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save() {
  return (
    <div>
      <InnerBlocks.Content />
    </div>
  );
}
