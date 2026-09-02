export const ICON_NAMES = [
	'arrow-left',
	'arrow-right',
	'brand-github',
	'brand-linkedin',
	'calendar',
	'check',
	'chevron-down',
	'chevron-left',
	'chevron-right',
	'external-link',
	'file-type-pdf',
	'flask',
	'home',
	'list-check',
	'mail',
	'map-pin',
	'menu-2',
	'message-circle',
	'pencil',
	'settings',
	'world-www',
	'x',
	'zoom-in',
	'zoom-out'
] as const

export type IconName = (typeof ICON_NAMES)[number]

const FILES = import.meta.glob<string>('../../assets/icons/*.svg', {
	eager: true,
	query: '?raw',
	import: 'default'
})

const ICONS = new Map(
	Object.entries(FILES).map(([path, source]) => [
		path.slice(path.lastIndexOf('/') + 1, -'.svg'.length),
		source
			.replace(/^[\s\S]*?<svg[^>]*>/, '')
			.replace(/<\/svg>\s*$/, '')
			.trim()
	])
)

for (const name of ICON_NAMES) {
	if (!ICONS.has(name)) {
		throw new Error(`Missing icon file: src/assets/icons/${name}.svg`)
	}
}

for (const name of ICONS.keys()) {
	if (!(ICON_NAMES as readonly string[]).includes(name)) {
		throw new Error(
			`Unlisted icon file: add '${name}' to ICON_NAMES in icons.ts`
		)
	}
}

export function iconMarkup(name: IconName) {
	return ICONS.get(name)!
}
