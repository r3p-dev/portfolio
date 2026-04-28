<script lang="ts">
	const skills = [
		{ category: 'Frontend', items: ['React', 'Next.js', 'Svelte', 'TypeScript', 'Tailwind CSS'] },
		{ category: 'Backend', items: ['Node.js', 'Express', 'AdonisJS', 'PostgreSQL'] },
		{ category: 'Tools', items: ['Git', 'Docker', 'Podman', 'Figma'] }
	]
</script>

<section class="py-5">
	<div class="grid gap-12 lg:grid-cols-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">About</h2>
			<div class="mt-6 space-y-4 text-muted-foreground">
				<p>
					I&apos;m a fullstack developer with a passion for building beautiful, functional, and
					accessible web applications. With experience across the entire stack, I enjoy turning
					complex problems into simple, intuitive solutions.
				</p>
				<p>
					When I&apos;m not coding, you can find me exploring new technologies, contributing to open
					source projects, or writing about web development on my blog.
				</p>
			</div>
		</div>

		<div>
			<h3 class="text-lg font-semibold">Skills & Technologies</h3>
			<div class="mt-6 space-y-6">
				{#each skills as skillGroup (skillGroup.category)}
					<div>
						<h4 class="text-sm font-medium text-muted-foreground">
							{skillGroup.category}
						</h4>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each skillGroup.items as skill (skill)}
								<span class="rounded-lg border border-border bg-secondary px-3 py-1 text-sm">
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
