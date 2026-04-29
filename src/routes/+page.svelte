<script lang="ts">
	import AppLayout from '$lib/components/layouts/app-layout.svelte'

	import AboutSection from '$lib/components/organisms/about-section.svelte'
	import BlogSection from '$lib/components/organisms/blog-section.svelte'
	import ExperienceSection from '$lib/components/organisms/experience-section.svelte'
	import HeroSection from '$lib/components/organisms/hero-section.svelte'
	import WorksSection from '$lib/components/organisms/works-section.svelte'
</script>

<AppLayout
	title="r3p.dev"
	description="Personal portfolio of r3p.dev. showcasing experience, about, projects, skills, and contact information."
	url="https://r3p.dev"
	ogImage="https://r3p.dev/og-image.png"
>
	<HeroSection />

	<div class="my-12 border-t border-border md:my-16"></div>

	<AboutSection />

	<div class="my-12 border-t border-border md:my-16"></div>

	<ExperienceSection />

	<div class="my-12 border-t border-border md:my-16"></div>

	<WorksSection />

	<div class="my-12 border-t border-border md:my-16"></div>

	<BlogSection />
</AppLayout>
