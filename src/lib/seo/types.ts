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

export type WebPageOptions = {
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

export type BlogPostingOptions = {
  canonical: string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  locale?: Locale
  tags?: readonly string[]
  image?: string
}

export type Alternate = {
  hreflang: string
  href: string
}
