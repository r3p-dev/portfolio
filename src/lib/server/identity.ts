import { createHash, randomBytes } from 'node:crypto'
import type { AstroCookies } from 'astro'

const COOKIE = 'guestbook_owner'
const MAX_AGE = 60 * 60 * 24 * 365
const TOKEN = /^[0-9a-f]{64}$/

const OPTIONS = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax',
	secure: import.meta.env.PROD,
	maxAge: MAX_AGE
} as const

function fingerprint(token: string) {
	return createHash('sha256').update(token).digest('hex')
}

function token(cookies: AstroCookies) {
	const value = cookies.get(COOKIE)?.value

	return value && TOKEN.test(value) ? value : undefined
}

export function readOwner(cookies: AstroCookies) {
	const value = token(cookies)

	return value ? fingerprint(value) : undefined
}

export function claimOwner(cookies: AstroCookies) {
	const existing = token(cookies)

	if (existing) {
		cookies.set(COOKIE, existing, OPTIONS)
		return fingerprint(existing)
	}

	const issued = randomBytes(32).toString('hex')
	cookies.set(COOKIE, issued, OPTIONS)

	return fingerprint(issued)
}
