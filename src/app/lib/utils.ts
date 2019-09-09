export function alertError(error: Error) {
	alert(error.message);
}

export function getLastFriday(): Date {
	const now = new Date();
	const diff = (7 - 5 + now.getDay()) % 7;
	const lastFriday = new Date();
	lastFriday.setDate(now.getDate() - diff);
	lastFriday.setHours(0);
	lastFriday.setMinutes(0);
	lastFriday.setSeconds(0);
	lastFriday.setMilliseconds(0);
	return lastFriday;
}

export function getFirstOfMonth(): Date {
	const date = new Date();
	const ret = new Date(date.getFullYear(), date.getMonth(), 1);
	return ret;
}

export function getFirstOfYear(): Date {
	const date = new Date();
	const ret = new Date(date.getFullYear(), 0, 1);
	return ret;
}

export function statusCodeStartsWith(
	statusCode: number,
	digit: number
): boolean {
	return String(statusCode).startsWith(String(digit));
}
