import type { Element, ElementContent } from 'hast'
import type { ShikiConfig } from '@astrojs/markdown-remark'

type Transformer = NonNullable<ShikiConfig['transformers']>[number]

function wrap(className: string[], children: ElementContent[]): Element {
	return {
		type: 'element',
		tagName: 'div',
		properties: { className },
		children
	}
}

export const shikiCodeBlocks: Transformer = {
	name: 'code-blocks',

	root(root) {
		const pre = root.children[0]

		if (pre?.type !== 'element' || pre.tagName !== 'pre') return

		const language = pre.properties['dataLanguage']

		root.children[0] =
			language === 'output'
				? wrap(
						['output-block'],
						[
							wrap(['output-block-label'], [{ type: 'text', value: 'Output' }]),
							pre
						]
					)
				: wrap(['code-block-wrapper', 'group', 'relative'], [pre])
	}
}
