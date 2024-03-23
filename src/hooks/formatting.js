export function formateDate(payload) {
	const date = new Date(payload)
	const options = {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}
	const dateTimeFormat = new Intl.DateTimeFormat('id-id', options)
	return dateTimeFormat.format(date).replace('pukul', '')
}
