import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import metadata from './block.json';

const data: any = metadata.name;
registerBlockType(data, {
  edit: Edit,
});
