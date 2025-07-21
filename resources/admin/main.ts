import './styles.scss';
import { registerPlugin, PluginArea } from '@wordpress/plugins';

import PluginMoreMenuItemComponent from './Post/PluginMoreMenuItemComponent';
import GalleryPanel from './Gallery/Galleries';
registerPlugin('my-custom-fields-plugin', {
  render: GalleryPanel,
  icon: 'images-alt',
});

registerPlugin('more-menu-item-test', { render: PluginMoreMenuItemComponent });
