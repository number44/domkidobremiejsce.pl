import { CSSProperties, useMemo } from 'react';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Panel, PanelRow, TextControl, Button, Icon } from '@wordpress/components';
import ImageComponent from '@components/ImageComponent';

interface LinkI {
  text: string;
  url: string;
  order_by: number;
}

interface AttributesI {
  [key: string]: any;
  links: LinkI[];
}
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: any) => void;
}

const SortableLinks = ({ attributes, setAttributes }: PropsI) => {
  const addLink = () => {
    setAttributes({
      ...attributes,
      links: [...attributes.links, { text: 'Nowy Link', url: '#', order_by: attributes.links.length + 1 }],
    });
  };

  const sortedLinks = useMemo(() => {
    const sortedByOrderBy = attributes.links.sort((a, b) => {
      return a.order_by - b.order_by;
    });
    return sortedByOrderBy;
  }, [attributes.links]);

  const moveUp = (link: LinkI) => {
    if (link.order_by === 1) return;

    const newLinks = attributes.links.map((lnk) => {
      if (lnk.order_by === link.order_by) {
        return {
          ...lnk,
          order_by: link.order_by - 1,
        };
      }
      if (lnk.order_by === link.order_by - 1) {
        return {
          ...lnk,
          order_by: link.order_by,
        };
      }
      return lnk;
    });
    setAttributes({
      ...attributes,
      links: [...newLinks],
    });
  };

  const moveDown = (link: LinkI) => {
    if (link.order_by === attributes.links.length) return;
    const newLinks = attributes.links.map((lnk) => {
      if (lnk.order_by === link.order_by) {
        return {
          ...lnk,
          order_by: link.order_by + 1,
        };
      }
      if (lnk.order_by === link.order_by + 1) {
        return {
          ...lnk,
          order_by: link.order_by,
        };
      }
      return lnk;
    });

    setAttributes({
      ...attributes,
      links: [...newLinks],
    });
  };
  const deleteLink = (link: LinkI) => {
    const newLinks = attributes.links
      .filter((lnk) => lnk.order_by !== link.order_by)
      .sort((a, b) => {
        return a.order_by - b.order_by;
      })
      .map((lnk, index) => {
        return {
          ...lnk,
          order_by: index + 1,
        };
      });

    setAttributes({
      ...attributes,
      links: [...newLinks],
    });
  };
  const changeText = (link: LinkI, text: string) => {
    const newLinks = attributes.links.map((lnk) => {
      if (lnk.order_by === link.order_by) {
        return {
          ...lnk,
          text,
        };
      }
      return lnk;
    });
    setAttributes({
      ...attributes,
      links: newLinks,
    });
  };
  const changeUrl = (link: LinkI, url: string) => {
    const newLinks = attributes.links.map((lnk) => {
      if (lnk.order_by === link.order_by) {
        return {
          ...lnk,
          url,
        };
      }
      return lnk;
    });
    setAttributes({
      ...attributes,
      links: newLinks,
    });
  };

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {sortedLinks.map((link, index) => (
        <div key={index} style={{ display: 'grid', gap: '1rem', border: 'solid 1px #ccc', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Button onClick={() => moveUp(link)} disabled={link.order_by === 1} icon={'arrow-up-alt'} />
              <Button
                onClick={() => moveDown(link)}
                disabled={link.order_by === attributes.links.length}
                icon={'arrow-down-alt'}
              />
            </div>
            <Button icon={'trash'} onClick={() => deleteLink(link)} />
          </div>

          <TextControl
            value={link.text}
            onChange={(value) => {
              changeText(link, value);
            }}
            __next40pxDefaultSize
          />
          <TextControl
            value={link.url}
            onChange={(value) => {
              changeUrl(link, value);
            }}
            __next40pxDefaultSize
          />
        </div>
      ))}
      <PanelRow>
        <Button className="w-full" onClick={addLink} variant="secondary" style={btnStyle}>
          Dodaj Do menu
        </Button>
      </PanelRow>
    </div>
  );
};
export default SortableLinks;
const btnStyle: CSSProperties = {
  background: '#144D29',
  color: '#fff',
  paddingBlock: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '.3rem',
};

const imageWrapperStyles: CSSProperties = {
  width: '100%',
  backgroundColor: '#434343',
  aspectRatio: '4/3',
  position: 'relative',
  display: 'grid',
  placeContent: 'center',
};

const imageStyles: CSSProperties = {
  width: '100',
  aspectRatio: '4/3',
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  height: '100%',
};
