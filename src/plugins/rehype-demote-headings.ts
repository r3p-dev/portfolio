import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'

type Parent = Root | Element
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const demoted: Record<HeadingTag, HeadingTag> = {
	h1: 'h2',
	h2: 'h3',
	h3: 'h4',
	h4: 'h5',
	h5: 'h6',
	h6: 'h6'
}

function isHeadingTag(tagName: string): tagName is HeadingTag {
	return tagName in demoted
}

export const rehypeDemoteHeadings: Plugin<[], Root> = function () {
	return function (tree) {
		walk(tree)

		function walk(node: Parent) {
			if (!Array.isArray(node.children)) return

			for (const child of node.children) {
				if (child.type === 'element' && isHeadingTag(child.tagName)) {
					child.tagName = demoted[child.tagName]
				}

				walk(child as Parent)
			}
		}
	}
}
