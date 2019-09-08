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

	static getFirstOfMonth(): Date {
		const date = new Date();
		const ret = new Date(date.getFullYear(), date.getMonth(), 1);
		return ret;
	}

	static getFirstOfYear(): Date {
		const date = new Date();
		const ret = new Date(date.getFullYear(), 0, 1);
		return ret;
	}

	static fetch_retry(url, options, n) {
		return fetch(url, options).catch(error => {
			if (n === 1) throw error;
			return Utils.fetch_retry(url, options, n - 1);
		});
	}
}
