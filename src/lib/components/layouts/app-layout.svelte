<script lang="ts">
	import type { Snippet } from 'svelte'
	import CodeblockCopy from '../atoms/codeblock-copy.svelte'
	import { ProgressiveBlur } from '../magic/progressive-blur'
	import { ScrollArea } from '../ui/scroll-area'
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
	import { Dock, DockIcon } from '../magic/dock'
	import { IconHome, IconListCheck, IconPencil } from '@tabler/icons-svelte'
	import { cn } from '$lib/utils'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	interface Props {
		title: string
		description: string
		url: string
		ogImage: string
		children: Snippet
	}

	interface NavProps {
		href: '/' | '/works' | '/blogs'
		icon: typeof IconHome
		label: string
	}

	let { title, description, url, ogImage, children }: Props = $props()

	const resolvedOgImage = $derived(`https://r3p.dev/og/${ogImage ?? 'home.png'}`)

	const navbar: NavProps[] = [
		{ href: '/', icon: IconHome, label: 'Home' },
		{ href: '/works', icon: IconListCheck, label: 'Works' },
		{ href: '/blogs', icon: IconPencil, label: 'Blog' }
	]

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/'
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/')
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={resolvedOgImage} />
	<meta property="og:image:alt" content="r3p.dev opengraph image" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:secure_url" content={resolvedOgImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={resolvedOgImage} />
</svelte:head>

<ScrollArea class="relative min-h-screen overflow-hidden bg-background">
	<main class="mx-auto max-w-5xl p-4 sm:p-6 md:p-8">
		<CodeblockCopy />

		{@render children?.()}

		<footer
			class="mx-auto flex max-w-5xl items-center justify-center gap-4 px-6 pt-8 pb-16 text-sm text-muted-foreground"
		>
			© {new Date().getFullYear()} r3p.dev. All rights reserved.
		</footer>
	</main>
</ScrollArea>

<div class="pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center">
	<div class="pointer-events-auto z-50 mb-5">
		<TooltipProvider>
			<Dock direction="middle">
				{#each navbar as item (item.label)}
					<DockIcon>
						<Tooltip>
							<TooltipTrigger>
								<a
									href={resolve(item.href)}
									aria-label={item.label}
									class={cn(
										'size-12 rounded-full bg-background/80 text-white transition-colors',
										isActive(item.href) ? 'hover:bg-foreground/80' : 'hover:bg-foreground/10'
									)}
								>
									<item.icon class="size-6" />
								</a>
							</TooltipTrigger>
							<TooltipContent>
								<p>{item.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				{/each}
			</Dock>
		</TooltipProvider>
	</div>

	<ProgressiveBlur position="bottom" height="70%" />
</div>
