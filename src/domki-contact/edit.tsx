import { __ } from '@wordpress/i18n'
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, Panel, PanelRow, TextControl, Button } from '@wordpress/components'
import './editor.scss'
import React, { Fragment, CSSProperties, useState } from 'react'
const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/spacer', 'core/list']
const ThemeUrl = window.location.protocol + '//' + window.location.host + '/wp-content/themes/miejscedobre'

interface PropsI {
	attributes: AttributesI
	setAttributes: (attributes: AttributesI) => void
	isSelected: boolean
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
	return (
		<Fragment>
			<Panel>
				<InspectorControls>
					<PanelBody title="Identyfikator Bloku" initialOpen={false}>
						<PanelRow>
							<TextControl
								label="Identyfikator"
								value={attributes.identifier}
								onChange={(value) => {
									setAttributes({
										...attributes,
										identifier: value,
									})
								}}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title="Kontakt">
						<PanelRow>
							<TextControl
								label={'tytuł'}
								value={attributes.title}
								onChange={(value) => {
									setAttributes({
										...attributes,
										title: value,
									})
								}}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			</Panel>
			<div {...useBlockProps()}>
				<h1 style={{ gridColumn: '1/-1', textAlign: 'center' }}>{attributes.title}</h1>
				<div className="text">
					<RichText
						value={attributes.content}
						onChange={(content) => {
							setAttributes({
								...attributes,
								content: content,
							})
						}}
						placeholder="xxxx"
					/>
				</div>
				<div className="form">
					<InnerBlocks allowedBlocks={['domki-form/domki-form']} />
				</div>
			</div>
		</Fragment>
	)
}
const btnStyle: CSSProperties = {
	background: '#144D29',
	color: '#fff',
	paddingBlock: '1rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '.3rem',
}
const btnPrimary: CSSProperties = {
	color: 'white',
	background: '#144D29',
	paddingBlock: '1rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '30rem',
}
const btnSecondary: CSSProperties = {
	color: '#144D29',
	background: '#E4F5EB',
	paddingBlock: '1rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '30rem',
}
const ImagePlaceholder: CSSProperties = {
	boxShadow: '0px 0px 3px #434343',
	borderRadius: '.5rem',
	background: '#ccc',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	cursor: 'pointer',
}
const deleteBtn: CSSProperties = {
	background: 'darkred',
	color: '#fff',
	paddingBlock: '1rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '.3rem',
	padding: '.5rem 2rem',
	cursor: 'pointer',
}

{
	/* <div className="placeholder" style={{ aspectRatio: '4/8' }}>
<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	strokeWidth={1.5}
	stroke="currentColor"
	className="w-6 h-6"
>
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
	/>
</svg>
</div> */
}
