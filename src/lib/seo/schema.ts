import { defaultLocale, type Locale } from '../i18n'
import { absolute, ORIGIN, PROFILES, SITE } from './config'
import type { Crumb } from './types'

const PERSON_ID = `${ORIGIN}/#person`
const WEBSITE_ID = `${ORIGIN}/#website`

function pageId(canonical: string) {
	return `${canonical}#webpage`
}

export function person() {
	return {
		'@type': 'Person',
		'@id': PERSON_ID,

		name: SITE.author,
		alternateName: ['r3p.dev', 'r3p', 'repiyan'],

		url: absolute('/'),
		image: absolute(SITE.logo.path),

		jobTitle: 'Fullstack Developer',
		address: { '@type': 'PostalAddress', addressCountry: 'ID' },
		knowsAbout: [
			'Web Development',
			'TypeScript',
			'Astro',
			'SvelteKit',
			'Laravel',
			'PostgreSQL',
			'Podman',
			'Linux Server Administration'
		],
		sameAs: [...PROFILES]
	}
}

export function website(description: string, locale: Locale = defaultLocale) {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,

		name: SITE.name,
		url: absolute('/'),
		description,

		inLanguage: locale,
		publisher: { '@id': PERSON_ID }
	}
}

export function siteNodes(description: string, locale: Locale = defaultLocale) {
	return [person(), website(description, locale)]
}

type WebPageOptions = {
	canonical: string
	name: string
	description: string
	locale?: Locale
	alsoTypes?: readonly string[]
	image?: string
	breadcrumb?: boolean
	dateModified?: string
	mainEntity?: unknown
}

export function webPage({
	canonical,
	name,
	description,
	locale = defaultLocale,
	alsoTypes = [],
	image = SITE.ogImage.path,
	breadcrumb = false,
	dateModified,
	mainEntity
}: WebPageOptions) {
	return {
		'@type': alsoTypes.length ? ['WebPage', ...alsoTypes] : 'WebPage',
		'@id': pageId(canonical),

		url: canonical,
		name,
		description,
		inLanguage: locale,

		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },

		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: absolute(image),
			width: SITE.ogImage.width,
			height: SITE.ogImage.height
		},

		...(dateModified ? { dateModified } : {}),
		...(mainEntity ? { mainEntity } : {}),
		...(breadcrumb ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {})
	}
}

type BlogPostingOptions = {
	canonical: string
	headline: string
	description: string
	datePublished: string
	dateModified?: string
	locale?: Locale
	tags?: readonly string[]
	image?: string
}

export function blogPosting({
	canonical,
	headline,
	description,
	datePublished,
	dateModified,
	locale = defaultLocale,
	tags = [],
	image = SITE.ogImage.path
}: BlogPostingOptions) {
	return {
		'@type': 'BlogPosting',
		'@id': `${canonical}#article`,

		headline,
		description,

		url: canonical,
		mainEntityOfPage: { '@id': pageId(canonical) },

		datePublished,
		dateModified: dateModified ?? datePublished,

		image: absolute(image),
		inLanguage: locale,
		...(tags.length ? { keywords: tags.join(', ') } : {}),

		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID }
	}
}

export function breadcrumbList(canonical: string, trail: readonly Crumb[]) {
	return {
		'@type': 'BreadcrumbList',
		'@id': `${canonical}#breadcrumb`,

		itemListElement: trail.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: absolute(crumb.path)
		}))
	}
}

export function itemList(
	canonical: string,
	items: readonly { name: string; path: string }[]
) {
	return {
		'@type': 'ItemList',
		'@id': `${canonical}#list`,

		numberOfItems: items.length,
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			url: absolute(item.path)
		}))
	}
}
