import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import type { Entry } from './types'

const FILE = process.env.GUESTBOOK_DB ?? './data/guestbook.db'

const COLUMNS = 'id, name, message, created_at, updated_at, owner'

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
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT,
			owner TEXT
		)
	`)

	migrate(opened)

	db = opened
	return db
}

function migrate(opened: DatabaseSync) {
	const existing = new Set(
		(
			opened.prepare('PRAGMA table_info(entries)').all() as { name: string }[]
		).map((column) => column.name)
	)

	if (!existing.has('updated_at')) {
		opened.exec('ALTER TABLE entries ADD COLUMN updated_at TEXT')
	}

	if (!existing.has('owner')) {
		opened.exec('ALTER TABLE entries ADD COLUMN owner TEXT')
	}
}

export function recentEntries(limit = 50) {
	return database()
		.prepare(`SELECT ${COLUMNS} FROM entries ORDER BY id DESC LIMIT ?`)
		.all(limit) as Entry[]
}

export function entryById(id: number) {
	return database()
		.prepare(`SELECT ${COLUMNS} FROM entries WHERE id = ?`)
		.get(id) as Entry | undefined
}

export function addEntry(name: string, message: string, owner: string) {
	database()
		.prepare('INSERT INTO entries (name, message, owner) VALUES (?, ?, ?)')
		.run(name, message, owner)
}

export function updateEntry(
	id: number,
	owner: string,
	name: string,
	message: string
) {
	const result = database()
		.prepare(
			`UPDATE entries SET name = ?, message = ?, updated_at = datetime('now')
			 WHERE id = ? AND owner IS NOT NULL AND owner = ?`
		)
		.run(name, message, id, owner)

	return result.changes > 0
}

export function deleteEntry(id: number, owner: string) {
	const result = database()
		.prepare(
			'DELETE FROM entries WHERE id = ? AND owner IS NOT NULL AND owner = ?'
		)
		.run(id, owner)

	return result.changes > 0
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
