import Track from "./Track.model";
import IntervalTracks from "./IntervalTracks.model";

export default class Friend {
	username: string;
	tracks: Map<string, IntervalTracks>;
	currentTrack?: Track;
	doesShowPublicData: boolean;

	constructor(username?: string) {
		this.username = username;
		this.tracks = new Map<string, IntervalTracks>();
	}

	safeGetTracks(rangeCode) {
		return this.tracks.get(rangeCode) !== undefined
			? this.tracks.get(rangeCode).tracks
			: 0;
	}

	get trackStr(): string {
		if (!this.currentTrack) {
			return "";
		}
		return `${this.currentTrack.artist} - ${this.currentTrack.name}`;
	}

	get trackRelDate(): string {
		return this.currentTrack.dateRelStr;
	}
}
