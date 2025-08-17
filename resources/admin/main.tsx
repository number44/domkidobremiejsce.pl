import "./styles.scss";
import { registerPlugin, PluginArea } from "@wordpress/plugins";

import Panel from "./Meta/Panel";
// registerPlugin("my-custom-fields-plugin", {
//   render: GalleryPanel,
//   icon: "admin-settings",
// });

// create react app

registerPlugin("custom-page-settings", {
  render: Panel,
  icon: "admin-settings", // This icon will appear in the "More Tools & Options" dropdown
});
