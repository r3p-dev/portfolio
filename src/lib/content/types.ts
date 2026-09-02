import type { MarkdownHeading } from 'astro'
import type { CollectionEntry } from 'astro:content'

export type Blog = CollectionEntry<'blogs'>
export type Project = CollectionEntry<'projects'>

export type TocNode = MarkdownHeading & {
	children: TocNode[]
}

export type TaggedEntry = {
	type: 'projects' | 'blogs'
	slug: string
	title: string
	description: string
	tags: string[]
	date: Date
}
