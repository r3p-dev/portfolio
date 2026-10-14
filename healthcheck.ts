export {}

const port = process.env.PORT ?? '4321'

try {
  const res = await fetch(`http://127.0.0.1:${port}/robots.txt`, {
    signal: AbortSignal.timeout(3000),
  })
  process.exit(res.ok ? 0 : 1)
} catch {
  process.exit(1)
}
