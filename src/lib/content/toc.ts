import type { MarkdownHeading } from 'astro'
import type { TocNode } from './types'

export function buildToc(items: MarkdownHeading[]) {
	const roots: TocNode[] = []
	const stack: TocNode[] = []

	for (const item of items) {
		const node: TocNode = { ...item, children: [] }

		while (stack.length && stack.at(-1)!.depth >= node.depth) {
			stack.pop()
		}

		const parent = stack.at(-1)

		if (parent) {
			parent.children.push(node)
		} else {
			roots.push(node)
		}

		stack.push(node)
	}

	return roots
}
