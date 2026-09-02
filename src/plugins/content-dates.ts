import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { parseFrontmatter } from '@astrojs/markdown-remark'

type DateMap = Record<string, string>

function isoDay(value: unknown) {
	if (value instanceof Date) return value.toISOString().slice(0, 10)
	if (typeof value === 'string') return value.slice(0, 10)

	return undefined
}

function datesIn(dir: string, prefix: string) {
	const dates: DateMap = {}

	let files: string[]
	try {
		files = readdirSync(dir, { recursive: true, encoding: 'utf8' })
	} catch {
		return dates
	}

	for (const file of files) {
		if (!/\.mdx?$/.test(file)) continue

		const source = readFileSync(join(dir, file), 'utf8')
		const { frontmatter } = parseFrontmatter(source)

		const date = isoDay(frontmatter['updated']) ?? isoDay(frontmatter['date'])
		if (!date) continue

		const slug = relative('.', file)
			.replace(/\.mdx?$/, '')
			.split(sep)
			.join('/')

		dates[`${prefix}/${slug}`] = date
	}

	return dates
}

export function contentDates(): DateMap {
	return {
		...datesIn('./src/contents/blogs', '/blogs'),
		...datesIn('./src/contents/projects', '/projects')
	}
}
