import "./styles.scss";
import { registerPlugin, PluginArea } from "@wordpress/plugins";

import GalleryPanel from "./Gallery/Galleries";
import Panel from "./Meta/Panel";
registerPlugin("my-custom-fields-plugin", {
  render: GalleryPanel,
  icon: "images-alt",
});

// create react app

registerPlugin("custom-page-settings", {
  render: Panel,
  icon: "admin-settings", // This icon will appear in the "More Tools & Options" dropdown
});
