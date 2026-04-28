<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card'
	import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-svelte'
	import background from '$lib/assets/images/background.png'
	import profile from '$lib/assets/images/profile.png'
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar'
	import { Button } from '$lib/components/ui/button'
</script>

<section>
	<Card
		class="shadow-lg-lg hover:shadow-lg-xl transition-shadow-lg w-full overflow-hidden pt-0 duration-300"
	>
		<!-- Banner Section -->
		<div class="relative">
			<!-- Banner Image with Gradient Overlay -->
			<div class="h-36 w-full overflow-hidden sm:h-44 md:h-56">
				<img
					src={background}
					alt="Profile banner"
					class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
				/>
				<!-- Subtle gradient overlay for depth -->
				<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
			</div>

			<!-- Avatar - Positioned to overlap banner -->
			<div class="absolute -bottom-12 left-4 sm:-bottom-16 sm:left-6 md:left-8">
				<div class="group relative">
					<Avatar
						class="shadow-lg-xl size-24 border-4 border-card ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30 sm:size-32 md:size-40"
					>
						<AvatarImage src={profile} alt="Muhamad Repiyan Riski" />
						<AvatarFallback
							class="bg-primary/10 text-xl font-bold text-primary sm:text-2xl md:text-3xl"
						>
							M. R. R.
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>

		<!-- Content Section -->
		<CardContent class="pt-12 pb-5 sm:pt-14 md:pt-18">
			<div class="flex flex-col gap-6">
				<!-- Info and Actions Row -->
				<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<!-- Name and Details -->
					<div class="space-y-1.5 pl-0 sm:pl-2">
						<h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
							r3p.dev
						</h1>
						<p class="text-base font-medium text-primary sm:text-lg md:text-xl">
							Software Engineer
						</p>
						<p class="flex items-center gap-1.5 text-sm text-muted-foreground sm:text-base">
							<svg class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							Indonesia
						</p>
					</div>

					<!-- Social Links -->
					<div class="flex flex-row gap-2 sm:gap-3">
						<Button
							size="icon"
							variant="outline"
							class="hover:shadow-lg-md size-11 rounded-xl transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:size-12"
							aria-label="Send email"
							onclick={() => window.open('mailto:r3p.dev@gmail.com', '_blank')}
						>
							<IconMail class="size-5 sm:size-6" />
						</Button>
						<Button
							size="icon"
							variant="outline"
							class="hover:shadow-lg-md size-11 rounded-xl transition-all duration-200 hover:scale-105 hover:border-[#333] hover:bg-[#333] hover:text-white sm:size-12"
							aria-label="View GitHub profile"
							onclick={() => window.open('https://github.com/r3p-dev', '_blank')}
						>
							<IconBrandGithub class="size-5 sm:size-6" />
						</Button>
						<Button
							size="icon"
							variant="outline"
							class="hover:shadow-lg-md size-11 rounded-xl transition-all duration-200 hover:scale-105 hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white sm:size-12"
							aria-label="View LinkedIn profile"
							onclick={() => window.open('https://linkedin.com/in/muhamad-repiyan', '_blank')}
						>
							<IconBrandLinkedin class="size-5 sm:size-6" />
						</Button>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</section>
