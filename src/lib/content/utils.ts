import { getCollection, getEntry } from 'astro:content'

import { defaultLocale, isLocale, type Locale } from '@lib/i18n'
import type { Blog, Project, TaggedEntry } from './types'

function isPublished({ data }: { data: { draft: boolean } }) {
	return import.meta.env.DEV || !data.draft
}

function byNewest(a: { data: { date: Date } }, b: { data: { date: Date } }) {
	return b.data.date.getTime() - a.data.date.getTime()
}

// Blog and project ids are `<slug>/<locale>`, one file per locale beside each
// other, mirroring how the `now` collection is split.
export function entrySlug(id: string) {
	const cut = id.lastIndexOf('/')

	return cut === -1 || !isLocale(id.slice(cut + 1)) ? id : id.slice(0, cut)
}

function entryLocale(id: string) {
	const tail = id.slice(id.lastIndexOf('/') + 1)

	return isLocale(tail) ? tail : defaultLocale
}

function rank(id: string, locale: Locale) {
	const entry = entryLocale(id)

	if (entry === locale) return 0
	if (entry === defaultLocale) return 1

	return 2
}

// One entry per slug: the requested locale when it exists, the default locale
// otherwise, so an untranslated post still renders instead of 404ing.
function localised<T extends { id: string }>(entries: T[], locale: Locale) {
	const bySlug = new Map<string, T>()

	for (const entry of entries) {
		const slug = entrySlug(entry.id)
		const current = bySlug.get(slug)

		if (!current || rank(entry.id, locale) < rank(current.id, locale)) {
			bySlug.set(slug, entry)
		}
	}

	return [...bySlug.values()]
}

export async function allBlogs(locale: Locale = defaultLocale): Promise<Blog[]> {
	return localised(await getCollection('blogs', isPublished), locale).sort(
		byNewest
	)
}

export async function allProjects(
	locale: Locale = defaultLocale
): Promise<Project[]> {
	return localised(await getCollection('projects', isPublished), locale).sort(
		byNewest
	)
}

export function nowEntry(locale: Locale) {
	return getEntry('now', locale)
}

export async function allTags(locale: Locale = defaultLocale) {
	const [blogs, projects] = await Promise.all([
		allBlogs(locale),
		allProjects(locale)
	])
	const tags = new Set<string>()

	for (const entry of [...blogs, ...projects]) {
		for (const tag of entry.data.tags) tags.add(tag)
	}

	return [...tags].sort()
}

export function isoDay(date: Date) {
	return date.toISOString().slice(0, 10)
}

export function formatDate(date: Date, locale: Locale) {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(date)
}

export const PER_PAGE = 10

export function totalPages(count: number) {
	return Math.max(1, Math.ceil(count / PER_PAGE))
}

export function blogPage(blogs: Blog[], page: number) {
	const pages = totalPages(blogs.length)
	const current = Math.min(Math.max(page, 1), pages)
	const start = (current - 1) * PER_PAGE

	return {
		blogs: blogs.slice(start, start + PER_PAGE),
		page: current,
		totalPages: pages,
		total: blogs.length
	}
}

export async function taggedEntries(
	tag: string,
	locale: Locale = defaultLocale
): Promise<TaggedEntry[]> {
	const [projects, blogs] = await Promise.all([
		allProjects(locale),
		allBlogs(locale)
	])

	function flatten(
		entries: (Blog | Project)[],
		type: TaggedEntry['type']
	): TaggedEntry[] {
		return entries
			.filter((entry) => entry.data.tags.includes(tag))
			.map((entry) => ({
				type,
				slug: entrySlug(entry.id),
				title: entry.data.title,
				description: entry.data.description,
				tags: entry.data.tags,
				date: entry.data.date
			}))
	}

	return [...flatten(projects, 'projects'), ...flatten(blogs, 'blogs')]
}
