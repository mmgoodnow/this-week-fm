import { Injectable } from "@angular/core";
import { API_KEY, API_URL, FRIENDS_URL } from "./constants";
import IntervalTracks from "./models/IntervalTracks.model";
import Friend from "./models/Friend.model";
import User from "./models/User.model";
import Track from "./models/Track.model";

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
					latestTrack: new Track(
						track.artist["#text"],
						track.name,
						nowPlaying,
						date
					),
				};
			});
	}

	getFriends(username): Promise<Array<Friend>> {
		return fetch(FRIENDS_URL + username)
			.then(response => response.json())
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
}
