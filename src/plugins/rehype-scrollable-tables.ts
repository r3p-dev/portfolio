import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'

type Parent = Root | Element

export const rehypeScrollableTables: Plugin<[], Root> = function () {
	return function (tree) {
		walk(tree)

		function walk(node: Parent) {
			if (!Array.isArray(node.children)) return

			node.children = node.children.map((child) => {
				walk(child as Parent)

				if (child.type !== 'element' || child.tagName !== 'table') return child

				const wrapper: Element = {
					type: 'element',
					tagName: 'div',
					properties: { className: ['table-scroll'] },
					children: [child]
				}

				return wrapper
			}) as typeof node.children
		}
	}
}
