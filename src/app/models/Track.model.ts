export default class Track {
	artist: string;
	name: string;
	nowPlaying: boolean;
	date?: Date;

	constructor(
		artist: string,
		name: string,
		nowPlaying: boolean,
		date?: Date
	) {
		this.artist = artist;
		this.name = name;
		this.nowPlaying = nowPlaying;
		if (date) {
			this.date = date;
		}
	}
}
