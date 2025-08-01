import { CSSProperties, useMemo } from "react";
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, Panel, PanelRow, TextControl, Button, Icon } from "@wordpress/components";
import ImageComponent from "@components/ImageComponent";

interface ElementI {
  text: string;
  url: string;
  unit: string;
  order_by: number;
}

interface AttributesI {
  [key: string]: any;
  elements: ElementI[];
}
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: any) => void;
  addHash?: boolean;
}

const SortableElements = ({ attributes, setAttributes, addHash = true }: PropsI) => {
  const addElement = () => {
    setAttributes({
      ...attributes,
      elements: [
        ...attributes.elements,
        { text: "0", unit: "km", url: addHash ? "Nowa atrakcja" : "", order_by: attributes.elements.length + 1 },
      ],
    });
  };

  const sortedElements = useMemo(() => {
    const sortedByOrderBy = attributes.elements.sort((a, b) => {
      return a.order_by - b.order_by;
    });
    return sortedByOrderBy;
  }, [attributes.elements]);

  const moveUp = (element: ElementI) => {
    if (element.order_by === 1) return;

    const newElements = attributes.elements.map((elem) => {
      if (elem.order_by === element.order_by) {
        return {
          ...elem,
          order_by: element.order_by - 1,
        };
      }
      if (elem.order_by === element.order_by - 1) {
        return {
          ...elem,
          order_by: element.order_by,
        };
      }
      return elem;
    });
    setAttributes({
      ...attributes,
      elements: [...newElements],
    });
  };

  const moveDown = (element: ElementI) => {
    if (element.order_by === attributes.elements.length) return;
    const newElements = attributes.elements.map((elem) => {
      if (elem.order_by === element.order_by) {
        return {
          ...elem,
          order_by: element.order_by + 1,
        };
      }
      if (elem.order_by === element.order_by + 1) {
        return {
          ...elem,
          order_by: element.order_by,
        };
      }
      return elem;
    });

    setAttributes({
      ...attributes,
      elements: [...newElements],
    });
  };
  const deleteElement = (element: ElementI) => {
    const newElements = attributes.elements
      .filter((elem) => elem.order_by !== element.order_by)
      .sort((a, b) => {
        return a.order_by - b.order_by;
      })
      .map((elem, index) => {
        return {
          ...elem,
          order_by: index + 1,
        };
      });

    setAttributes({
      ...attributes,
      elements: [...newElements],
    });
  };
  const changeText = (element: ElementI, text: string) => {
    const newElements = attributes.elements.map((elem) => {
      if (elem.order_by === element.order_by) {
        return {
          ...elem,
          text,
        };
      }
      return elem;
    });
    setAttributes({
      ...attributes,
      elements: newElements,
    });
  };
  const changeUrl = (element: ElementI, url: string) => {
    const newElements = attributes.elements.map((elem) => {
      if (elem.order_by === element.order_by) {
        return {
          ...elem,
          url,
        };
      }
      return elem;
    });
    setAttributes({
      ...attributes,
      elements: newElements,
    });
  };

  const changeUnit = (element: ElementI, unit: string) => {
    const newElements = attributes.elements.map((elem) => {
      if (elem.order_by === element.order_by) {
        return {
          ...elem,
          unit,
        };
      }
      return elem;
    });
    setAttributes({
      ...attributes,
      elements: newElements,
    });
  };
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {sortedElements.map((element, index) => (
        <div key={index} style={{ display: "grid", gap: ".2rem", border: "solid 1px #ccc", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Button onClick={() => moveUp(element)} disabled={element.order_by === 1} icon={"arrow-up-alt"} />
              <Button
                onClick={() => moveDown(element)}
                disabled={element.order_by === attributes.elements.length}
                icon={"arrow-down-alt"}
              />
            </div>
            <Button icon={"trash"} onClick={() => deleteElement(element)} />
          </div>

          <TextControl
            label="Nazwa"
            value={element.text}
            onChange={(value) => {
              changeText(element, value);
            }}
          />
          <TextControl
            label="Jednostka"
            value={element.unit}
            onChange={(value) => {
              changeUnit(element, value);
            }}
            style={{ width: "3rem" }}
          />
          <TextControl
            value={element.url}
            onChange={(value) => {
              changeUrl(element, value);
            }}
            __next40pxDefaultSize
          />
        </div>
      ))}
      <PanelRow>
        <Button className="w-full" onClick={addElement} variant="secondary" style={btnStyle}>
          Dodaj Do menu
        </Button>
      </PanelRow>
    </div>
  );
};
export default SortableElements;
const btnStyle: CSSProperties = {
  background: "#144D29",
  color: "#fff",
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3rem",
};

const imageWrapperStyles: CSSProperties = {
  width: "100%",
  backgroundColor: "#434343",
  aspectRatio: "4/3",
  position: "relative",
  display: "grid",
  placeContent: "center",
};

const imageStyles: CSSProperties = {
  width: "100",
  aspectRatio: "4/3",
  position: "absolute",
  inset: 0,
  objectFit: "cover",
  height: "100%",
};
