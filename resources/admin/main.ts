import './styles.scss';
import PluginDocumentSettingPanelDemo from './Post/PluginDocumentSettingPanelDemo';
import { registerPlugin } from '@wordpress/plugins';
import PluginPrePublishPanelTest from './Post/PluginPrePublishPanelTest';
import PluginBlockSettingsMenuGroupTest from './Post/PluginBlockSettingsMenuGroupTest';

registerPlugin('my-custom-fields-plugin', {
  render: PluginDocumentSettingPanelDemo,
  icon: 'palmtree', // Choose an appropriate Dashicon for your panel
});

registerPlugin('pre-publish-panel-test', {
  render: PluginPrePublishPanelTest,
});

registerPlugin('block-settings-menu-group-test', {
  render: PluginBlockSettingsMenuGroupTest,
});
