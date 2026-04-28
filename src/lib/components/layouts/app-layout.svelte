<script lang="ts">
	import type { Snippet } from 'svelte'
	import CodeblockCopy from '../atoms/codeblock-copy.svelte'
	import Footer from '../atoms/footer.svelte'

	interface Props {
		title: string
		description: string
		url: string
		ogImage: string
		children: Snippet
	}

	let { title, description, url, ogImage, children }: Props = $props()

	const resolvedOgImage = $derived(`https://r3p.dev/og/${ogImage ?? 'home.png'}`)
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

<div class="relative flex min-h-screen flex-col bg-black">
	<CodeblockCopy />
	<div class="relative overflow-hidden">
		<main class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 md:py-12">
			{@render children?.()}
		</main>
	</div>
	<Footer />
</div>
