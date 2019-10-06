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
	const today = new Date();
	return new Date(today.getFullYear(), today.getMonth(), 1);
}

export function getFirstOfYear(): Date {
	const today = new Date();
	return new Date(today.getFullYear(), 0, 1);
}

export function statusCodeStartsWith(
	statusCode: number,
	digit: number
): boolean {
	return String(statusCode).startsWith(String(digit));
}

export function intervalKey(from: Date, to: Date): string {
	return `${from.valueOf()}-${to.valueOf()}`;
}

export function partial(func: Function, ...presets) {
	return (...args) => func(...presets, ...args);
}

export function partialR(func: Function, ...presets) {
	return (...args) => func(...args, ...presets);
}
