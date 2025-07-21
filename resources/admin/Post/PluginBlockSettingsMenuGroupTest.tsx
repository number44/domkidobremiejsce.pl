import { PluginBlockSettingsMenuItem } from '@wordpress/editor';

const PluginBlockSettingsMenuGroupTest = () => (
  <PluginBlockSettingsMenuItem
    allowedBlocks={['core/paragraph']}
    icon="smiley"
    label="Menu item text"
    onClick={() => {
      alert('clicked');
    }}
  />
);

export default PluginBlockSettingsMenuGroupTest;
