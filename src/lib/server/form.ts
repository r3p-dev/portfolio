import { clean, validate } from './validation'
import { addEntry, isDuplicate } from './db'
import type { GuestbookState } from './types'

export const EMPTY_STATE: GuestbookState = {
	errors: {},
	values: { name: '', message: '' }
}

export async function handleSubmission(
	request: Request,
	redirectTo: string
): Promise<Response | GuestbookState> {
	const form = await request.formData()

	const values = {
		name: clean(form.get('name')),
		message: clean(form.get('message'))
	}

	if (clean(form.get('website'))) {
		return redirect(redirectTo)
	}

	const errors = validate(values.name, values.message)

	if (Object.keys(errors).length > 0) {
		return { errors, values }
	}

	if (isDuplicate(values.name, values.message)) {
		return { errors: { message: 'duplicate' }, values }
	}

	addEntry(values.name, values.message)

	return redirect(redirectTo)
}

function redirect(location: string) {
	return new Response(null, { status: 303, headers: { Location: location } })
}
