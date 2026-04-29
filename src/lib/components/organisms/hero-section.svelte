<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card'
	import { IconBrandGithub, IconBrandLinkedin, IconMail, IconMapPin } from '@tabler/icons-svelte'
	import background from '$lib/assets/images/background.png'
	import profile from '$lib/assets/images/profile.png'
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar'
	import { cn } from '$lib/utils'

	const socials = [
		{
			href: 'mailto:r3p.dev@gmail.com',
			label: 'Send email',
			icon: IconMail,
			classes: 'hover:border-primary hover:bg-primary hover:text-primary-foreground'
		},
		{
			href: 'https://github.com/r3p-dev',
			label: 'View GitHub profile',
			icon: IconBrandGithub,
			classes: 'hover:border-[#444] hover:bg-[#444] hover:text-white'
		},
		{
			href: 'https://linkedin.com/in/muhamad-repiyan',
			label: 'View LinkedIn profile',
			icon: IconBrandLinkedin,
			classes: 'hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white'
		}
	]
</script>

<section>
	<Card
		class="w-full overflow-hidden pt-0 shadow-lg transition-shadow duration-300 hover:shadow-xl"
	>
		<div class="relative">
			<div class="h-36 w-full overflow-hidden sm:h-44 md:h-56">
				<img
					src={background}
					alt="Profile banner"
					class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
				/>
				<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
			</div>

			<div class="absolute -bottom-12 left-4 sm:-bottom-16 sm:left-6 md:left-8">
				<div class="group relative">
					<Avatar
						class="size-24 border-4 border-card shadow-lg ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30 sm:size-32 md:size-40"
					>
						<AvatarImage src={profile} alt="Muhamad Repiyan Riski" />
						<AvatarFallback
							class="bg-primary text-xl font-bold text-secondary sm:text-2xl md:text-3xl"
						>
							r3p.dev
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>

		<CardContent class="pt-12 pb-5 sm:pt-14 md:pt-18">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:px-4">
				<div class="space-y-1.5">
					<h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
						r3p.dev
					</h1>
					<p class="text-base font-medium text-primary sm:text-lg md:text-xl">Web Developer</p>
					<p class="flex items-center gap-1.5 text-sm text-muted-foreground sm:text-base">
						<IconMapPin class="size-4" />
						Indonesia
					</p>
				</div>

				<div class="flex flex-row gap-2 sm:gap-3">
					{#each socials as link (link.href)}
						<a
							href={link.href}
							target="_blank"
							rel="external"
							class={cn(
								'inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-input transition-all duration-200 hover:scale-105 hover:shadow-md sm:size-12',
								link.classes
							)}
							aria-label={link.label}
						>
							<link.icon class="size-5" />
						</a>
					{/each}
				</div>
			</div>
		</CardContent>
	</Card>
</section>
