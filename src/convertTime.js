export default function convertTime(time) {
	const date = new Date(time*1000).toLocaleTimeString(undefined, {
		dateStyle: 'short',
		timeStyle: 'short'
	})
	return date;
}