import Track from "./Track.model";

export default class Friend {
	username: string;
	tracks: number;
	tracksPerDay: number;
	latestTrack: Track;

	constructor(username?: string) {
		this.username = username;
		this.tracks = 0;
		this.tracksPerDay = 0;
	}

	get nowPlaying(): boolean {
		return this.latestTrack && this.latestTrack.nowPlaying;
	}
}
