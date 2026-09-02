import type { AstroCookies } from 'astro'

import { clean, validate } from './validation'
import {
	addEntry,
	deleteEntry,
	entryById,
	isDuplicate,
	updateEntry
} from './db'
import { claimOwner, readOwner } from './identity'
import type { GuestbookNotice, GuestbookState, GuestbookView } from './types'

const NOTICES = ['signed', 'updated', 'deleted', 'not_allowed'] as const

export const EMPTY_STATE: GuestbookState = {
	errors: {},
	values: { name: '', message: '' }
}

export async function handleSubmission(
	request: Request,
	cookies: AstroCookies,
	path: string
): Promise<Response | GuestbookState> {
	const form = await request.formData()
	const intent = clean(form.get('intent'))

	if (intent === 'update') return updateNote(form, cookies, path)
	if (intent === 'delete') return deleteNote(form, cookies, path)

	return sign(form, cookies, path)
}

function sign(form: FormData, cookies: AstroCookies, path: string) {
	const values = {
		name: clean(form.get('name')),
		message: clean(form.get('message'))
	}

	if (clean(form.get('website'))) {
		return redirect(done(path, 'signed'))
	}

	const errors = validate(values.name, values.message)

	if (Object.keys(errors).length > 0) {
		return { errors, values }
	}

	if (isDuplicate(values.name, values.message)) {
		return { errors: { message: 'duplicate' as const }, values }
	}

	addEntry(values.name, values.message, claimOwner(cookies))

	return redirect(done(path, 'signed'))
}

function updateNote(form: FormData, cookies: AstroCookies, path: string) {
	const id = toId(form.get('id'))
	const owner = readOwner(cookies)

	if (id === undefined || owner === undefined || !owns(id, owner)) {
		return redirect(done(path, 'not_allowed'))
	}

	const values = {
		name: clean(form.get('name')),
		message: clean(form.get('message'))
	}

	const errors = validate(values.name, values.message)

	if (Object.keys(errors).length > 0) {
		return { editing: id, errors, values }
	}

	if (!updateEntry(id, owner, values.name, values.message)) {
		return redirect(done(path, 'not_allowed'))
	}

	return redirect(done(path, 'updated', `entry-${id}`))
}

function deleteNote(form: FormData, cookies: AstroCookies, path: string) {
	const id = toId(form.get('id'))
	const owner = readOwner(cookies)

	if (id === undefined || owner === undefined || !deleteEntry(id, owner)) {
		return redirect(done(path, 'not_allowed'))
	}

	return redirect(done(path, 'deleted'))
}

export function readView(url: URL, state: GuestbookState): GuestbookView {
	const requested = toId(url.searchParams.get('edit'))
	const notice = url.searchParams.get('done')

	return {
		editing: state.editing ?? requested,
		notice: isNotice(notice) ? notice : undefined
	}
}

function owns(id: number, owner: string) {
	const entry = entryById(id)

	return entry?.owner != null && entry.owner === owner
}

function toId(value: FormDataEntryValue | string | null) {
	const id = Number(typeof value === 'string' ? value : NaN)

	return Number.isSafeInteger(id) && id > 0 ? id : undefined
}

function isNotice(value: string | null): value is GuestbookNotice {
	return value !== null && (NOTICES as readonly string[]).includes(value)
}

function done(path: string, notice: GuestbookNotice, anchor = 'entries') {
	return `${path}?done=${notice}#${anchor}`
}

function redirect(location: string) {
	return new Response(null, { status: 303, headers: { Location: location } })
}
