import { Glob } from 'bun'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'

const DYNAMIC_ROUTES = ['/guestbook', '/id/guestbook']

const found = { script: new Set<string>(), style: new Set<string>() }
const re = /<(script|style)(\s[^>]*)?>([\s\S]*?)<\/\1>/g

function collect(html: string) {
  for (const m of html.matchAll(re)) {
    const [tag, attrs, body] = [m[1] ?? '', m[2] ?? '', m[3] ?? '']
    if (!body.trim() || /\ssrc=|ld\+json/.test(attrs)) continue
    const hash = createHash('sha256').update(body).digest('base64')
    found[tag as 'script' | 'style'].add(`'sha256-${hash}'`)
  }
}

for await (const file of new Glob('dist/**/*.html').scan()) {
  collect(await Bun.file(file).text())
}

const port = 4399
const dbDir = mkdtempSync(join(tmpdir(), 'csp-hashes-'))

const server = Bun.spawn(['bun', 'dist/server/entry.mjs'], {
  env: {
    ...process.env,
    PORT: String(port),
    HOST: '127.0.0.1',
    GUESTBOOK_DB: join(dbDir, 'guestbook.db'),
  },
  stdout: 'ignore',
  stderr: 'ignore',
})

try {
  const base = `http://127.0.0.1:${port}`
  for (let ready = false, attempt = 0; !ready; attempt++) {
    if (attempt >= 50) throw new Error('Server tidak siap setelah 5 detik')
    ready = await fetch(base).then(
      (r) => r.ok || r.status === 404,
      () => false,
    )
    if (!ready) await Bun.sleep(100)
  }

  for (const route of DYNAMIC_ROUTES) {
    const res = await fetch(`http://127.0.0.1:${port}${route}`)
    collect(await res.text())
  }
} finally {
  server.kill()
  await server.exited
  rmSync(dbDir, { recursive: true, force: true })
}

console.log('script-src', [...found.script].join(' '))
console.log('style-src', [...found.style].join(' '))
