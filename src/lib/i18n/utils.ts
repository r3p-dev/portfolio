import { i18n } from 'astro:config/client'
import { toCodes } from 'astro:i18n'

import { en } from './en'
import { id } from './id'
import type { Locale, MessageKey, Messages } from './types'

if (!i18n) {
	throw new Error('`i18n` must be configured in astro.config.ts.')
}

const catalogues = { en, id } satisfies Record<Locale, Messages>

export const locales = toCodes(i18n.locales) as Locale[]

export const defaultLocale = i18n.defaultLocale as Locale

for (const locale of locales) {
	if (!(locale in catalogues)) {
		throw new Error(`Missing message catalogue for locale "${locale}".`)
	}
}

export function isLocale(value: string | undefined): value is Locale {
	return value !== undefined && (locales as string[]).includes(value)
}

export function toLocale(value: string | undefined) {
	return isLocale(value) ? value : defaultLocale
}

export function useTranslations(locale: string | undefined) {
	const catalogue = catalogues[toLocale(locale)]

	return function t(
		key: MessageKey,
		values?: Record<string, string | number>
	): string {
		const message = catalogue[key]

		if (!values) return message

		return message.replace(/\{(\w+)\}/g, (match, name: string) =>
			name in values ? String(values[name]) : match
		)
	}
}
