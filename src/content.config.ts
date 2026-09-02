import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'zod'

const shared = {
	title: z.string().min(1).max(120),
	description: z.string().min(1),
	date: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string().min(1)).default([]),
	draft: z.boolean().default(false)
}

const blogs = defineCollection({
	loader: glob({
		base: './src/contents/blogs',
		pattern: '**/*.{md,mdx}'
	}),
	schema: function ({ image }) {
		return z.object({
			...shared,
			cover: image().optional()
		})
	}
})

const projects = defineCollection({
	loader: glob({
		base: './src/contents/projects',
		pattern: '**/*.{md,mdx}'
	}),
	schema: function ({ image }) {
		return z.object({
			...shared,
			cover: image().optional(),
			repository: z.url().optional(),
			demo: z.url().optional(),
			wip: z.boolean().default(false)
		})
	}
})

const now = defineCollection({
	loader: glob({
		base: './src/contents/now',
		pattern: '**/*.{md,mdx}'
	}),
	schema: z.object({
		updatedAt: z.coerce.date()
	})
})

export const collections = { blogs, projects, now }
