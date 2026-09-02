import type { GuestbookError, GuestbookField } from './types'

export const LIMITS = {
	name: { min: 1, max: 40 },
	message: { min: 2, max: 500 }
} as const

export function clean(value: FormDataEntryValue | null) {
	return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : ''
}

export function validate(name: string, message: string) {
	const errors: Partial<Record<GuestbookField, GuestbookError>> = {}

	if (name.length < LIMITS.name.min) {
		errors.name = 'name_required'
	} else if (name.length > LIMITS.name.max) {
		errors.name = 'name_too_long'
	}

	if (message.length < LIMITS.message.min) {
		errors.message = 'message_required'
	} else if (message.length > LIMITS.message.max) {
		errors.message = 'message_too_long'
	}

	return errors
}
