export type Entry = {
	id: number
	name: string
	message: string
	created_at: string
}

export type GuestbookField = 'name' | 'message'

export type GuestbookError =
	| 'name_required'
	| 'name_too_long'
	| 'message_required'
	| 'message_too_long'
	| 'duplicate'

export type GuestbookState = {
	errors: Partial<Record<GuestbookField, GuestbookError>>
	values: { name: string; message: string }
}
