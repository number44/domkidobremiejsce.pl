import { PluginDocumentSettingPanel, PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/editor";
import React, { CSSProperties, useState } from "react";
import { Button, Modal } from "@wordpress/components";
import MetaForm from "./MetaForm";
interface PropsI {}
const Panel = ({}: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <PluginSidebarMoreMenuItem icon={"google"} target="my-sidebar-plugin">
        <h4>Google - oceny</h4>
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
        name="my-sidebar-plugin"
        title="Google - Oceny."
        icon="google" // Dashicon or custom SVG
      >
        <Button
          variant="secondary"
          style={{ width: "100%", textAlign: "center", display: "block" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Button
        </Button>
      </PluginSidebar>
      {isModalOpen && (
        <Modal size="large" title={"Google -SEO - meta data."} onRequestClose={closeModal}>
          <MetaForm />
        </Modal>
      )}
    </>
  );
};
export default Panel;

const styles: CSSProperties = {};
