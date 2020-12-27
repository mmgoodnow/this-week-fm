import { Injectable } from "@angular/core";
import { API_KEY, API_URL } from "../lib/constants";
import { HttpClient, HttpParams } from "@angular/common/http";
import { retry } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class LastService {
	constructor(private http: HttpClient) {}

	getFriends(username) {
		const request = {
			method: "user.getFriends",
			user: username,
			api_key: API_KEY,
			format: "json",
		};
		const params = new HttpParams({ fromObject: request });
		return this.http.get(API_URL, { params }).pipe(retry(2));
	}

	getTracks(user: string, from: Date, to: Date) {
		const request = {
			method: "user.getrecenttracks",
			limit: String(1),
			user,
			from: String(Math.floor(from.valueOf() / 1000)),
			to: String(Math.floor(to.valueOf() / 1000)),
			api_key: API_KEY,
			format: "json",
		};
		const params = new HttpParams({ fromObject: request });
		return this.http.get(API_URL, { params }).pipe(retry(2));
	}
}
