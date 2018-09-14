import { Injectable } from "@angular/core";
import { apikey, url } from "./constants";

@Injectable({
	providedIn: "root",
})
export class LastService {
	constructor() {}

	private queryString(params): string {
		const esc = encodeURIComponent;
		return (
			"?" +
			Object.keys(params)
				.map(k => esc(k) + "=" + esc(params[k]))
				.join("&")
		);
	}

	getThisWeekTracks(user, from: Date, to: Date) {
		const request = {
			method: "user.getrecenttracks",
			user: user,
			from: Math.floor(from.valueOf() / 1000),
			to: Math.floor(to.valueOf() / 1000),
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request)).then(response =>
			response.json()
		);
	}

	getFriends(user) {
		const request = {
			method: "user.getFriends",
			user: user,
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request)).then(response =>
			response.json()
		);
	}

	getInfo(user) {
		const request = {
			method: "user.getInfo",
			user: user,
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request)).then(response =>
			response.json()
		);
	}
}
