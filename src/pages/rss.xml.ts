import { getRelativeLocaleUrl } from 'astro:i18n'
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { ORIGIN, SITE } from '@lib/seo'
import { allBlogs } from '@lib/content'
import { defaultLocale, useTranslations } from '@lib/i18n'

export const GET: APIRoute = async ({ site }) => {
	const blogs = await allBlogs()
	const t = useTranslations(defaultLocale)

	return rss({
		title: `${SITE.name} — ${t('page_blogs_title')}`,
		description: `Writing by ${SITE.author} on infrastructure, servers, and web development.`,
		site: site ?? ORIGIN,
		trailingSlash: false,
		items: blogs.map((blog) => ({
			title: blog.data.title,
			description: blog.data.description,
			pubDate: blog.data.date,
			link: getRelativeLocaleUrl(defaultLocale, `/blogs/${blog.id}`),
			categories: [...blog.data.tags],
			author: SITE.author
		})),
		customData: `<language>${defaultLocale}</language>`
	})
}
