<script lang="ts">
	interface Experience {
		role: string
		company: string
		duration: string
		contributions: string
	}

	const experiences: Experience[] = [
		{
			role: 'Senior Fullstack Developer',
			company: 'TechCorp Inc.',
			duration: '2024 - Present',
			contributions:
				'Leading development of microservices architecture and frontend applications. Improved system performance by 40% through optimization.'
		},
		{
			role: 'Fullstack Developer',
			company: 'StartupXYZ',
			duration: '2022 - 2024',
			contributions:
				'Built and maintained multiple web applications serving 100k+ users. Implemented CI/CD pipelines and automated testing.'
		},
		{
			role: 'Frontend Developer',
			company: 'Digital Agency',
			duration: '2020 - 2022',
			contributions:
				'Developed responsive web applications for various clients. Collaborated with design team to implement pixel-perfect UIs.'
		}
	]
</script>

<section class="py-5">
	<div>
		<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Experience</h2>
		<p class="mt-4 text-muted-foreground">
			A timeline of my professional journey in software development.
		</p>
	</div>

	<div class="mt-12 space-y-0">
		{#each experiences as experience (experience.role)}
			<div class="relative pb-12 pl-8 last:pb-0">
				<div class="absolute top-2 left-0 h-full w-px bg-gray-500"></div>

				<div class="absolute top-2 left-0 h-2 w-2 -translate-x-2/5 rounded-full bg-white"></div>

				<div class="space-y-3">
					<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
						<h3 class="font-semibold text-white">
							{experience.role} <span class="text-muted-foreground">· {experience.company}</span>
						</h3>
						<span class="text-sm text-muted-foreground">
							{experience.duration}
						</span>
					</div>

					<ul class="mt-3 space-y-2">
						<p class="text-sm text-muted-foreground">
							{experience.contributions}
						</p>
					</ul>
				</div>
			</div>
		{/each}
	</div>
</section>
