<script lang="ts">
	import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-svelte'
</script>

<footer>
	<div
		class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row"
	>
		<p class="text-sm text-muted-foreground">
			© {new Date().getFullYear()} r3p.dev. All rights reserved.
		</p>
		<div class="flex items-center gap-4">
			<a
				href="https://github.com/r3p.dev"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground transition-colors hover:text-background"
				aria-label="GitHub"
			>
				<IconBrandGithub class="size-5" />
			</a>
			<a
				href="https://linkedin.com/in/muhamad-repiyan"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground transition-colors hover:text-background"
				aria-label="LinkedIn"
			>
				<IconBrandLinkedin class="size-5" />
			</a>
		</div>
	</div>
</footer>
