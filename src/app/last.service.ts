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

	getThisWeekTracks(user) {
		const request = {
			method: "user.getrecenttracks",
			user: user,
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request)).then(response =>
			response.json()
		);
	}
}
