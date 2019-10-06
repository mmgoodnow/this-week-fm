import { Injectable } from "@angular/core";
import {
	API_KEY,
	API_URL,
	GETFRIENDS_URL,
	LAST_FM_DOWN,
} from "../lib/constants";
import IntervalTracks from "../models/IntervalTracks.model";
import Friend from "../models/Friend.model";
import User from "../models/User.model";
import Track from "../models/Track.model";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { retry, retryWhen } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class LastService {
	constructor(private http: HttpClient) {}

	private queryString(params): string {
		const esc = encodeURIComponent;
		return (
			"?" +
			Object.keys(params)
				.map(k => `${esc(k)}=${esc(params[k])}`)
				.join("&")
		);
	}

	getTracks(user, from: Date, to: Date): Promise<IntervalTracks> {
		const request = {
			method: "user.getrecenttracks",
			limit: 1,
			user: user,
			from: Math.floor(from.valueOf() / 1000),
			to: Math.floor(to.valueOf() / 1000),
			api_key: API_KEY,
			format: "json",
		};
		return fetch(API_URL + this.queryString(request))
			.then(response => response.json())
			.then(json => {
				if (json.recenttracks.track.length === 0) {
					return { tracks: 0 };
				}
				const track = json.recenttracks.track[0];
				let date;
				const nowPlaying =
					track.hasOwnProperty("@attr") && track["@attr"].nowplaying;
				if (!nowPlaying) {
					date = new Date(track.date.uts * 1000);
				}
				const tracks = json.recenttracks["@attr"].total;
				return {
					tracks,
					lastTrack: new Track(
						track.name,
						track.artist["#text"],
						track.album["#text"],
						track.url,
						date
					),
				};
			});
	}

	getFriends(username): Promise<Array<Friend>> {
		return fetch(GETFRIENDS_URL + username)
			.then(response => {
				// if (response.status === 404) throw new Error(USER_NOT_FOUND);
				if (response.status !== 200) throw new Error(LAST_FM_DOWN);
				return response.json();
			})
			.then(friends => friends.map(name => new Friend(name)));
	}

	getInfo(user): Promise<User> {
		const request = {
			method: "user.getInfo",
			user: user,
			api_key: API_KEY,
			format: "json",
		};
		return fetch(API_URL + this.queryString(request))
			.then(response => response.json())
			.then(json => {
				if (json.error) {
					return null;
				}
				return json.user.name;
			});
	}

	getFriendsRx(username) {
		const request = {
			method: "user.getFriends",
			user: username,
			api_key: API_KEY,
			format: "json",
		};
		const params = new HttpParams({ fromObject: request });
		return this.http.get(API_URL, { params }).pipe(retry(2));
	}

	getTracksRx(user: string, from: Date, to: Date) {
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
