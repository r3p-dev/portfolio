<script lang="ts">
	import AppLayout from '$lib/components/layouts/app-layout.svelte'

	import AboutSection from '$lib/components/organisms/about-section.svelte'
	import ExperienceSection from '$lib/components/organisms/experience-section.svelte'
	import HeroSection from '$lib/components/organisms/hero-section.svelte'
</script>

<AppLayout
	title="r3p.dev"
	description="Personal portfolio of r3p.dev. showcasing experience, about, projects, skills, and contact information."
	url="https://r3p.dev"
	ogImage="https://r3p.dev/og-image.png"
>
	<div class="space-y-5">
		<HeroSection />
		<AboutSection />
		<ExperienceSection />
	</div>
</AppLayout>
