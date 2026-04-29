<script lang="ts">
	interface Experience {
		role: string
		company: string
		duration: string
		contributions: string[]
	}

	const experiences: Experience[] = [
		{
			role: 'Senior Fullstack Developer',
			company: 'TechCorp Inc.',
			duration: '2024 - Present',
			contributions: [
				'Led the development of a microservices architecture serving 1M+ users',
				'Reduced page load times by 60% through performance optimizations',
				'Mentored junior developers and established coding standards'
			]
		},
		{
			role: 'Fullstack Developer',
			company: 'StartupXYZ',
			duration: '2022 - 2024',
			contributions: [
				'Built and shipped 5 major product features from concept to production',
				'Implemented CI/CD pipelines reducing deployment time by 80%',
				'Collaborated with design team to improve UX across the platform'
			]
		},
		{
			role: 'Frontend Developer',
			company: 'Digital Agency',
			duration: '2020 - 2022',
			contributions: [
				'Developed responsive web applications for Fortune 500 clients',
				'Created reusable component libraries used across multiple projects',
				'Introduced TypeScript adoption improving code quality and DX'
			]
		}
	]
</script>

<section class="py-5">
	<div>
		<h2 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Experience</h2>
		<p class="mt-4 text-muted-foreground">
			A timeline of my professional journey in software development.
		</p>
	</div>

	<div class="mt-12 space-y-0">
		{#each experiences as experience (experience.role)}
			<div class="relative pb-12 pl-8 last:pb-0">
				<div class="absolute top-2 left-0 h-full w-0.5 bg-gray-400"></div>

				<div class="absolute top-2 left-0 size-2 translate-x-[-40%] rounded-full bg-primary"></div>

				<div class="space-y-3">
					<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
						<h3 class="font-semibold text-foreground">
							{experience.role} <span class="text-muted-foreground">· {experience.company}</span>
						</h3>
						<span class="text-sm text-muted-foreground">
							{experience.duration}
						</span>
					</div>

					<ul class="mt-3 space-y-2">
						{#each experience.contributions as contribution (contribution)}
							<li class="flex items-start gap-2 text-sm text-muted-foreground">
								<span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"></span>
								{contribution}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</section>
