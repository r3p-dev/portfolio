import { i18n } from 'astro:config/client'

import { defaultLocale, locales } from './i18n'

const prefixDefaultLocale =
	i18n?.routing !== 'manual' && (i18n?.routing.prefixDefaultLocale ?? false)

export function langParams() {
	return locales
		.filter(function (locale) {
			return prefixDefaultLocale || locale !== defaultLocale
		})
		.map(function (locale) {
			return { params: { lang: locale }, props: { locale } }
		})
}
