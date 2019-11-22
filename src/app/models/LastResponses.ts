export interface LastFriendsResponse {
	friends: {
		"@attr": string;
		user: { name: string }[];
	};
}

export interface LastTrackListing {
	"@attr": { nowplaying: string };
	artist: {
		"#text": string;
	};
	album: {
		"#text": string;
	};
	date?: {
		uts: string;
	};
	url: string;
	name: string;
}

export interface LastTracksResponse {
	recenttracks: {
		"@attr": { total: string };
		track: LastTrackListing | LastTrackListing[];
	};
}

export interface LastFmError {
	error: number;
	message: string;
}

export function instanceOfLastFmError(obj: any): obj is LastFmError {
	return "error" in obj && "message" in obj;
}
