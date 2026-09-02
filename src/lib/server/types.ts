export type Entry = {
	id: number
	name: string
	message: string
	created_at: string
	updated_at: string | null
	owner: string | null
}

export type GuestbookField = 'name' | 'message'

export type GuestbookError =
	| 'name_required'
	| 'name_too_long'
	| 'message_required'
	| 'message_too_long'
	| 'duplicate'

export type GuestbookNotice = 'signed' | 'updated' | 'deleted' | 'not_allowed'

export type GuestbookState = {
	editing?: number
	errors: Partial<Record<GuestbookField, GuestbookError>>
	values: { name: string; message: string }
}

export type GuestbookView = {
	editing?: number | undefined
	notice?: GuestbookNotice | undefined
}
