import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import type { Entry } from './types'

const FILE = process.env.GUESTBOOK_DB ?? './data/guestbook.db'

let db: DatabaseSync | undefined

function database() {
	if (db) return db

	mkdirSync(dirname(FILE), { recursive: true })

	const opened = new DatabaseSync(FILE)
	opened.exec('PRAGMA journal_mode = WAL')
	opened.exec(`
		CREATE TABLE IF NOT EXISTS entries (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			message TEXT NOT NULL,
			created_at TEXT NOT NULL DEFAULT (datetime('now'))
		)
	`)

	db = opened
	return db
}

export function recentEntries(limit = 50) {
	return database()
		.prepare(
			'SELECT id, name, message, created_at FROM entries ORDER BY id DESC LIMIT ?'
		)
		.all(limit) as Entry[]
}

export function addEntry(name: string, message: string) {
	database()
		.prepare('INSERT INTO entries (name, message) VALUES (?, ?)')
		.run(name, message)
}

export function isDuplicate(name: string, message: string) {
	const row = database()
		.prepare(
			`SELECT COUNT(*) AS count FROM entries
			 WHERE name = ? AND message = ? AND created_at > datetime('now', '-1 hour')`
		)
		.get(name, message) as { count: number } | undefined

	return (row?.count ?? 0) > 0
}
