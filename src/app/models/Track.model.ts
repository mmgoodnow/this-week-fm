import * as moment from "moment-mini";

export default class Track {
	name: string;
	artist: string;
	album: string;
	url: string;
	nowPlaying: boolean;
	date?: Date;

	constructor(
		name: string,
		artist: string,
		album: string,
		url: string,
		nowPlaying: boolean,
		date?: Date
	) {
		this.name = name;
		this.artist = artist;
		this.album = album;
		this.url = url;
		this.nowPlaying = nowPlaying;
		this.date = date;
	}

	get dateRelStr(): string {
		return moment(this.date).fromNow();
	}
}
