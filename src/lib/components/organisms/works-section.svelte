<script lang="ts">
	import { IconArrowRight } from '@tabler/icons-svelte'
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
	import { Badge } from '../ui/badge'
	import { resolve } from '$app/paths'
	import { Button } from '../ui/button'

	interface Project {
		title: string
		description: string
		thumbnail: string
		tags: string[]
		datePublished: string
		link: '/'
	}

	const projects: Project[] = [
		{
			title: 'E-commerce Platform',
			description:
				'A full-featured e-commerce platform built with Next.js and PostgreSQL. Features include product catalog, shopping cart, payment integration, and admin dashboard.',
			thumbnail:
				'https://images.unsplash.com/photo-1460925895917-adf4e7e2ed0e?w=600&h=400&fit=crop',
			tags: ['Next.js', 'React', 'PostgreSQL', 'Stripe'],
			datePublished: 'June 2024',
			link: '/'
		},
		{
			title: 'Task Management App',
			description:
				'A collaborative task management application with real-time updates. Supports team collaboration, task prioritization, and progress tracking with a modern UI.',
			thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
			tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
			datePublished: 'April 2024',
			link: '/'
		},
		{
			title: 'AI Chat Assistant',
			description:
				'An intelligent chat assistant powered by AI. Built with streaming capabilities, markdown support, and conversation history. Perfect for customer support and automation.',
			thumbnail:
				'https://images.unsplash.com/photo-1677442d019cecf8c5ee9a2d4a87d5c76a3f3e6d?w=600&h=400&fit=crop',
			tags: ['Next.js', 'AI SDK', 'OpenAI', 'TypeScript'],
			datePublished: 'February 2024',
			link: '/'
		},
		{
			title: 'Design System',
			description:
				'A comprehensive design system and component library built with React. Includes 50+ components, documentation, and Storybook integration for seamless UI development.',
			thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
			tags: ['React', 'Storybook', 'CSS-in-JS', 'Figma'],
			datePublished: 'January 2024',
			link: '/'
		}
	]
</script>

<section class="py-5">
	<div class="space-y-8">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Projects</h2>
				<p class="mt-2 text-muted-foreground">Featured projects and work I&apos;m proud of.</p>
			</div>
			<Button href="/works" variant="outline" class="w-fit gap-2 text-foreground">
				View All <IconArrowRight class="size-4" />
			</Button>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			{#each projects as project (project.title)}
				<a href={resolve(project.link)} class="group">
					<Card
						class="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
					>
						<div class="relative h-40 w-full overflow-hidden bg-muted">
							<img
								src={project.thumbnail}
								alt={project.title}
								width={600}
								height={400}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>

						<CardHeader>
							<CardTitle class="text-lg transition-colors group-hover:text-primary">
								{project.title}
							</CardTitle>
							<CardDescription class="line-clamp-2">
								{project.description}
							</CardDescription>
						</CardHeader>

						<CardContent class="space-y-4">
							<div class="flex flex-wrap gap-2">
								{#each project.tags as tag (tag)}
									<Badge variant="secondary" class="text-xs">
										{tag}
									</Badge>
								{/each}
							</div>

							<p class="text-xs text-muted-foreground">
								{project.datePublished}
							</p>
						</CardContent>
					</Card>
				</a>
			{/each}
		</div>
	</div>
</section>
