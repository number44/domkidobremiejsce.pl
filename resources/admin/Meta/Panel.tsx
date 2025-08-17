import { PluginDocumentSettingPanel, PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/editor";
import React, { CSSProperties, useState } from "react";
import { Button, Modal } from "@wordpress/components";
import MetaForm from "./MetaForm";
import GalleryPanel from "../Gallery/GalleryPanel";

interface PropsI {}
const Panel = ({}: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <PluginSidebarMoreMenuItem icon={"google"} target="my-sidebar-plugin">
        <h4>Galerie</h4>
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
        name="my-sidebar-plugin"
        title="Galeria."
        icon="format-gallery" // Dashicon or custom SVG
      >
        <GalleryPanel />
      </PluginSidebar>
    </>
  );
};
export default Panel;

const styles: CSSProperties = {};
