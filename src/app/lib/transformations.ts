import Friend from "../models/Friend.model";
import {
	LastFmError,
	LastFriendsResponse,
	LastTrackListing,
	LastTracksResponse,
} from "../models/LastResponses";
import Track from "../models/Track.model";
import IntervalTracks from "../models/IntervalTracks.model";

export function lastFriendsToUsernames(friends: LastFriendsResponse): string[] {
	return friends.friends.user.map(user => user.name);
}

export function usernamesToFriends(users: string[]): Friend[] {
	return users.map(username => new Friend(username));
}

export function errorCodeToString(error: LastFmError): string {
	return `Error ${error.error}: ${error.message}`;
}

export function normalizeRecentTrackSchema(
	res: LastTracksResponse
): LastTracksResponse {
	const {
		recenttracks: { track },
	} = res;
	if (!(track instanceof Array)) {
		res.recenttracks.track = [track as LastTrackListing];
	}
	return res;
}

export function transformLastTrack(res: LastTrackListing): Track {
	const {
		album: { "#text": album },
		artist: { "#text": artist },
		name,
		url,
	} = res;
	const nowPlaying = res["@attr"] && res["@attr"].nowplaying === "true";
	const date = res.date ? new Date(Number(res.date.uts) * 1000) : undefined;

	return new Track(name, artist, album, url, nowPlaying, date);
}

export function hydrateUserTracks(
	friend: Friend,
	timeframe: string,
	res: LastTracksResponse
): Friend {
	res = normalizeRecentTrackSchema(res);

	const trackListings = res.recenttracks.track as LastTrackListing[];
	const tracks = trackListings.map(transformLastTrack);

	const total = Number(res.recenttracks["@attr"].total);

	const nowPlaying = tracks.find(track => track.nowPlaying);
	const lastPlayed = tracks.find(track => !track.nowPlaying);

	const listing = new IntervalTracks(total, lastPlayed);

	friend.currentTrack = nowPlaying;
	friend.tracks.set(timeframe, listing);
	return friend;
}
