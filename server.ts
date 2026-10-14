import { createServer } from 'node:http'

process.env.ASTRO_NODE_AUTOSTART = 'disabled'
const { handler } = await import(new URL('./dist/server/entry.mjs', import.meta.url).href)

const csp = await Bun.file(new URL('./dist/csp.txt', import.meta.url)).text()
const port = Number(process.env.PORT ?? 4321)
const host = process.env.HOST ?? '0.0.0.0'

createServer((req, res) => {
  res.setHeader('Content-Security-Policy', csp)
  handler(req, res)
}).listen(port, host, () => console.log(`Listening on http://${host}:${port}`))

for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => process.exit(0))
