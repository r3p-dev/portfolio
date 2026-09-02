import type { Locale } from '@lib/i18n'

export type Crumb = {
	name: string
	path: string
}

export type PageSeo = {
	path: string
	title: string
	description: string
	locale?: Locale
	type?: 'website' | 'article' | 'profile'
	noindex?: boolean
	image?: string
	imageAlt?: string
	published?: string
	modified?: string
	tags?: readonly string[]
	prev?: string | undefined
	next?: string | undefined
	jsonLd?: readonly object[]
}
