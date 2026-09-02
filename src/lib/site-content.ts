import type { IconName } from '../components/atoms'

export type Social = {
	href: string
	label: string
	icon: IconName
	me?: boolean
	classes: string
}

export const socials: Social[] = [
	{
		href: 'https://r3p.dev/cv.pdf',
		label: 'Download CV',
		icon: 'file-type-pdf',
		classes: 'hover:border-[#F40F02] hover:bg-[#F40F02] hover:text-white'
	},
	{
		href: 'mailto:repiyan@r3p.dev',
		label: 'Send email',
		icon: 'mail',
		classes:
			'hover:border-primary hover:bg-primary hover:text-primary-foreground'
	},
	{
		href: 'https://github.com/r3p-dev',
		label: 'View GitHub profile',
		icon: 'brand-github',
		me: true,
		classes: 'hover:border-[#444] hover:bg-[#444] hover:text-white'
	},
	{
		href: 'https://linkedin.com/in/muhamad-repiyan',
		label: 'View LinkedIn profile',
		icon: 'brand-linkedin',
		me: true,
		classes: 'hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white'
	}
]

export const skills = [
	{ category: 'Languages', items: ['TypeScript', 'PHP'] },
	{ category: 'Frontend', items: ['React', 'Svelte', 'Tailwind CSS'] },
	{
		category: 'Backend',
		items: ['ExpressJS', 'AdonisJS', 'Laravel', 'PostgreSQL']
	},
	{ category: 'Tools', items: ['Git', 'Docker', 'Podman', 'GitHub Actions'] }
]

export const experiences = [
	{
		role: 'Fullstack Developer Intern',
		company: 'PT. Sumapala Integrasi Solusi',
		duration: 'Apr 2025 - Jul 2025',
		contributions:
			'Implemented role-based access control for internal web applications and integrated deck.gl to visualize geospatial data for Kabupaten Bandung, working closely with frontend and backend teams.'
	},
	{
		role: 'Frontend Developer',
		company: 'Freelance',
		duration: 'Jun 2024 - Jul 2024',
		contributions:
			'Refactored existing frontend interfaces for better usability and responsiveness, integrated them with backend REST APIs, and fixed UI inconsistencies across devices.'
	},
	{
		role: 'Fullstack Developer Intern',
		company: 'Infinite Learning Indonesia',
		duration: 'Feb 2024 - Jul 2024',
		contributions:
			'Built a florist e-commerce web application during the MSIB internship program, developing responsive frontend components and backend CRUD features in an Agile team.'
	}
]
