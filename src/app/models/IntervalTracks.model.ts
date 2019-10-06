import Track from "./Track.model";

export default class IntervalTracks {
	tracks: number;
	lastTrack?: Track;

	constructor(tracks: number, lastTrack: Track) {
		this.tracks = tracks;
		this.lastTrack = lastTrack;
	}
}
