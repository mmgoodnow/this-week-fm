import Track from "./Track.model";
import { Point } from "chart.js";

export default class Friend {
	username: string;
	tracks: number;
	allTracks: Track[];
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

	get trackStr(): string {
		if (!this.latestTrack) {
			return "";
		}
		return this.latestTrack.artist + " - " + this.latestTrack.name;
	}

	get trackRelDate(): string {
		return this.latestTrack.dateRelStr;
	}

	tracksAsPoints(): any[] {
		const points = [];
		for (let i = 0; i < this.allTracks.length; i++) {
			const track = this.allTracks[i];
			points.push({ t: track.date, y: i + 1 });
		}
		return points;
	}
}
