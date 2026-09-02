import { defineConfig, fontProviders } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import tailwindcss from '@tailwindcss/vite'

import { rehypeDemoteHeadings } from '@plugins/rehype-demote-headings'
import { rehypeScrollableTables } from '@plugins/rehype-scrollable-tables'
import { shikiCodeBlocks } from '@plugins/shiki-code-blocks'
import { contentDates } from '@plugins/content-dates'

const SITE_URL = 'https://r3p.dev'

const I18N = {
	defaultLocale: 'en',
	locales: ['en', 'id'],
	routing: { prefixDefaultLocale: false }
}

const DATES = contentDates()

export default defineConfig({
	devToolbar: { enabled: false },

	site: SITE_URL,
	output: 'static',
	trailingSlash: 'never',
	prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
	adapter: node({ mode: 'standalone' }),
	i18n: I18N,

	build: { inlineStylesheets: 'always' },

	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains-mono',
			weights: ['100 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['monospace'],
			optimizedFallbacks: true
		}
	],

	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			i18n: {
				defaultLocale: I18N.defaultLocale,
				locales: Object.fromEntries(
					I18N.locales.map((locale) => [locale, locale])
				)
			},
			customPages: I18N.locales.map((locale) =>
				locale === I18N.defaultLocale
					? `${SITE_URL}/guestbook`
					: `${SITE_URL}/${locale}/guestbook`
			),

			serialize(item) {
				const path =
					new URL(item.url).pathname.replace(/^\/id(?=\/|$)/, '') || '/'
				const lastmod = DATES[path]

				return {
					...item,
					...(lastmod && { lastmod: `${lastmod}T00:00:00.000Z` }),
					priority: path === '/' ? 1 : path.split('/').length > 2 ? 0.6 : 0.8
				}
			}
		})
	],

	markdown: {
		processor: unified({
			rehypePlugins: [
				rehypeDemoteHeadings,
				rehypeHeadingIds,
				rehypeScrollableTables,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'append',
						properties: {
							className: ['heading-anchor'],
							ariaHidden: 'true',
							tabIndex: -1
						},
						content: []
					}
				]
			]
		}),

		syntaxHighlight: 'shiki',
		shikiConfig: {
			wrap: false,
			transformers: [shikiCodeBlocks],

			themes: {
				light: 'github-light-default',
				dark: 'github-dark-default'
			},

			langAlias: {
				output: 'text',
				caddy: 'text'
			}
		}
	},

	vite: {
		plugins: [tailwindcss()]
	}
})
