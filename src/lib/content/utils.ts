import { getCollection, getEntry } from 'astro:content'

import type { Locale } from '@lib/i18n'
import type { Blog, Project, TaggedEntry } from './types'

function isPublished({ data }: { data: { draft: boolean } }) {
	return import.meta.env.DEV || !data.draft
}

function byNewest(a: { data: { date: Date } }, b: { data: { date: Date } }) {
	return b.data.date.getTime() - a.data.date.getTime()
}

export async function allBlogs(): Promise<Blog[]> {
	return (await getCollection('blogs', isPublished)).sort(byNewest)
}

export async function allProjects(): Promise<Project[]> {
	return (await getCollection('projects', isPublished)).sort(byNewest)
}

export function nowEntry(locale: Locale) {
	return getEntry('now', locale)
}

export async function allTags() {
	const [blogs, projects] = await Promise.all([allBlogs(), allProjects()])
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

export async function taggedEntries(tag: string): Promise<TaggedEntry[]> {
	const [projects, blogs] = await Promise.all([allProjects(), allBlogs()])

	function flatten(
		entries: (Blog | Project)[],
		type: TaggedEntry['type']
	): TaggedEntry[] {
		return entries
			.filter((entry) => entry.data.tags.includes(tag))
			.map((entry) => ({
				type,
				slug: entry.id,
				title: entry.data.title,
				description: entry.data.description,
				tags: entry.data.tags,
				date: entry.data.date
			}))
	}

	return [...flatten(projects, 'projects'), ...flatten(blogs, 'blogs')]
}
