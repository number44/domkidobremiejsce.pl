import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import metadata from './block.json';
import save from './save';

const data: any = metadata;
registerBlockType(data.name, {
  edit: Edit,
  save: save,
});
