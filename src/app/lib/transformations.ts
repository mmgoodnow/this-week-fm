import Friend from "../models/Friend.model";
import { LastFmError, LastFriendsResponse } from "../models/LastResponses";

export function lastFriendsToUsernames(friends: LastFriendsResponse): string[] {
	return friends.friends.user.map(user => user.name);
}

export function usernamesToFriends(users: string[]): Friend[] {
	return users.map(username => new Friend(username));
}

export function errorCodeToString(error: LastFmError): string {
	return `Error ${error.error}: ${error.message}`;
}
