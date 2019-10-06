import Friend from "./Friend.model";

export default class User extends Friend {
	reset(): User {
		this.currentTrack = undefined;
		return this;
	}
}
