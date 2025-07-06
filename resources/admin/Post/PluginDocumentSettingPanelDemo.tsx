import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { TextControl, PanelRow } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { PluginDocumentSettingPanel } from '@wordpress/editor';

interface MyCustomFieldsPluginProps {}

const PluginDocumentSettingPanelDemo = () => {
  return (
    <PluginDocumentSettingPanel
      name="custom-panel"
      title="Custom Panel"
      className="custom-panel"
    >
      <h1>Custom Panel Content</h1>
      <p>This is the content of the custom panel.</p>
    </PluginDocumentSettingPanel>
  );
};
export default PluginDocumentSettingPanelDemo;

// Register the plugin to add the panel
