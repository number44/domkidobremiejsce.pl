import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import React from 'react'
interface PropsI {
	attributes: AttributesI
}
const ThemeUrl = window.location.protocol + '//' + window.location.host + '/wp-content/themes/miejscedobre'
const PageUrl = window.location.protocol + '//' + window.location.host

export default function save({ attributes }: PropsI) {
	return (
		<section id={attributes.identifier}>
			<div className="container">
				<InnerBlocks.Content />
			</div>
		</section>
	)
}
