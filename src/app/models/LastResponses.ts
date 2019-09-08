export interface LastFriendsResponse {
	friends: {
		"@attr": string;
		user: { name: string }[];
	};
}

export interface LastFmError {
	error: number;
	message: string;
}

export function instanceOfLastFmError(obj: any): obj is LastFmError {
	return "error" in obj && "message" in obj;
}
