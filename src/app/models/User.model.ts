import Friend from "./Friend.model";

export default class User extends Friend {
	reset(): User {
		this.tracks = 0;
		this.tracksPerDay = 0;
		this.latestTrack = undefined;
		return this;
	}
}
