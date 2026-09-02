import type { APIRoute } from 'astro'
import { ORIGIN } from '@lib/seo'

export const GET: APIRoute = ({ site }) => {
	const origin = site?.href.replace(/\/$/, '') ?? ORIGIN

	const body = [
		'User-agent: *',
		'Allow: /',
		'# The error page carries no indexable content.',
		'Disallow: /404',
		'',
		`Sitemap: ${origin}/sitemap-index.xml`,
		''
	].join('\n')

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	})
}
