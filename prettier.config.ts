import type { Config } from 'prettier'

const config: Config = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],

  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'css',
  proseWrap: 'preserve',
}

export default config
