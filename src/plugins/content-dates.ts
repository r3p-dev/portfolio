import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { parseFrontmatter } from '@astrojs/markdown-remark'

type DateMap = Record<string, string>

function isoDay(value: unknown) {
	if (value instanceof Date) return value.toISOString().slice(0, 10)
	if (typeof value === 'string') return value.slice(0, 10)

	return undefined
}

function datesIn(dir: string, prefix: string, locales: readonly string[]) {
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

		const segments = relative('.', file)
			.replace(/\.mdx?$/, '')
			.split(sep)

		// `<slug>/<locale>` files all describe the same unprefixed path, so the
		// locale segment is dropped and the newest date across them wins.
		if (segments.length > 1 && locales.includes(segments.at(-1)!)) {
			segments.pop()
		}

		const path = `${prefix}/${segments.join('/')}`
		const current = dates[path]

		if (!current || date > current) dates[path] = date
	}

	return dates
}

export function contentDates(locales: readonly string[]): DateMap {
	return {
		...datesIn('./src/contents/blogs', '/blogs', locales),
		...datesIn('./src/contents/projects', '/projects', locales)
	}
}
