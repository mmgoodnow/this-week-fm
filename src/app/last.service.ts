import { Injectable } from "@angular/core";
import { apikey, url } from "./constants";
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
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request))
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
		const request = {
			method: "user.getFriends",
			user: username,
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request))
			.then(response => response.json())
			.then(json => {
				if (json.error) {
					return null;
				}
				if (json.friends) {
					return json.friends.user.map(user => new Friend(user.name));
				} else {
					return [];
				}
			});
	}

	getInfo(user): Promise<User> {
		const request = {
			method: "user.getInfo",
			user: user,
			api_key: apikey,
			format: "json",
		};
		return fetch(url + this.queryString(request))
			.then(response => response.json())
			.then(json => {
				if (json.error) {
					return null;
				}
				return json.user.name;
			});
	}
}
