export class Friend {
	username: string;
	tracks: number;
	tracksPerDay: number;
	latestTrack: Track;

	constructor(username?: string) {
		this.username = username;
		this.tracks = 0;
		this.tracksPerDay = 0;
	}
}

export class User extends Friend {
	reset(): User {
		this.tracks = 0;
		this.tracksPerDay = 0;
		this.latestTrack = undefined;
		return this;
	}
}

export class Track {
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

export class IntervalTracks {
	tracks: number;
	latestTrack?: Track;
}
