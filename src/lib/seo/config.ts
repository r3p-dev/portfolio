import { site } from 'astro:config/client'

import type { Locale } from '@lib/i18n'

if (!site) {
	throw new Error('`site` must be set in astro.config.ts for absolute URLs.')
}

export const ORIGIN = site

export const SITE = {
	name: 'r3p.dev',
	author: 'Muhamad Repiyan',

	logo: { path: '/logo.png', width: 1024, height: 1024 },
	ogImage: { path: '/og.png', width: 1200, height: 630, type: 'image/png' }
} as const

export const PROFILES = [
	'https://github.com/r3p-dev',
	'https://linkedin.com/in/muhamad-repiyan'
] as const

export const OG_LOCALES = {
	en: 'en_US',
	id: 'id_ID'
} as const satisfies Record<Locale, string>

export function absolute(path: string) {
	return new URL(path, ORIGIN).href
}

const TITLE_BUDGET = 60

export function pageTitle(title: string) {
	const suffixed = `${title} — ${SITE.name}`

	return suffixed.length <= TITLE_BUDGET ? suffixed : title
}
