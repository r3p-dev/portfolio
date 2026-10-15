import { getAbsoluteLocaleUrl, getAbsoluteLocaleUrlList } from 'astro:i18n'
import { defaultLocale, locales, type Locale } from '@lib/i18n'
import type { Alternate } from './types'

export function canonical(path: string, locale: Locale) {
  return getAbsoluteLocaleUrl(locale, path)
}

export function alternates(path: string): Alternate[] {
  const urls = getAbsoluteLocaleUrlList(path)

  return [
    ...locales.map((locale, index) => ({
      hreflang: locale,
      href: urls[index] ?? canonical(path, locale),
    })),
    { hreflang: 'x-default', href: canonical(path, defaultLocale) },
  ]
}
