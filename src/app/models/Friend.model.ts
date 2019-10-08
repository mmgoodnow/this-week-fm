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

	static compareByTracks(rangeCode, f1: Friend, f2: Friend): number {
		const tracks1 = f1.safeGetTracks(rangeCode);
		const tracks2 = f2.safeGetTracks(rangeCode);
		return tracks2 - tracks1;
	}

	safeGetTracks(rangeCode) {
		return this.tracks.get(rangeCode) !== undefined
			? this.tracks.get(rangeCode).tracks
			: 0;
	}
}
