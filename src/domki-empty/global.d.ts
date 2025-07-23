interface AttributesI {
	identifier: string
	title: string
}

interface LinkI {
	text: string
	url: string
}
interface ImageI {
	id: number
	url: string
	alt: string
	thumbnail: string
	medium: string
	large: string
	full: string
}

interface MediaImageI {
	id: number
	title: string
	filename: string
	url: string
	link: string
	alt: string
	author: string
	description: string
	caption: string
	name: string
	status: string
	uploadedTo: number
	date: string
	modified: string
	menuOrder: number
	mime: string
	type: string
	subtype: string
	icon: string
	dateFormatted: string
	nonces: {
		update: string
		delete: string
		edit: string
	}
	editLink: string
	meta: boolean
	authorName: string
	authorLink: string
	uploadedToTitle: string
	uploadedToLink: string
	filesizeInBytes: number
	filesizeHumanReadable: string
	context: string
	height: number
	width: number
	orientation: string
	sizes: {
		thumbnail: {
			height: number
			width: number
			url: string
			orientation: string
		}
		medium: {
			height: number
			width: number
			url: string
			orientation: string
		}
		large: {
			height: number
			width: number
			url: string
			orientation: string
		}
		full: {
			height: number
			width: number
			url: string
			orientation: string
		}
	}
	compat: {
		item: string
		meta: string
	}
}

/**
 * Swiper
 */
