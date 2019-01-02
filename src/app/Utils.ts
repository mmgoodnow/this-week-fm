export default class Utils {
	static handleErrors(error: Error) {
		alert(error.message);
	}

	static getLastFriday(): Date {
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
}
