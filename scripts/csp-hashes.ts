import { Glob } from 'bun'
import { createHash } from 'node:crypto'

const OUTPUT = 'dist/csp.txt'

const found = { script: new Set<string>(), style: new Set<string>() }
const re = /<(script|style)(\s[^>]*)?>([\s\S]*?)<\/\1>/g

for await (const file of new Glob('dist/**/*.html').scan()) {
  for (const m of (await Bun.file(file).text()).matchAll(re)) {
    const [tag, attrs, body] = [m[1] ?? '', m[2] ?? '', m[3] ?? '']
    if (!body.trim() || /\ssrc=|ld\+json/.test(attrs)) continue
    const hash = createHash('sha256').update(body).digest('base64')
    found[tag as 'script' | 'style'].add(`'sha256-${hash}'`)
  }
}

const policy = [
  "default-src 'none'",
  `script-src 'self' ${[...found.script].join(' ')} https://static.cloudflareinsights.com`,
  `style-src 'self' ${[...found.style].join(' ')}`,
  "style-src-attr 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "manifest-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  "form-action 'self'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
].join('; ')

await Bun.write(OUTPUT, policy)
console.log(`${OUTPUT}: ${found.script.size} script, ${found.style.size} style hash`)
