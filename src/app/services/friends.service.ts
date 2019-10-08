import { Injectable } from "@angular/core";
import { LastService } from "./last.service";
import {
	BehaviorSubject,
	from as fromArray,
	Observable,
	Subscription,
} from "rxjs";
import { first, map, mergeMap, take, tap } from "rxjs/operators";
import {
	hydrateUserTracks,
	lastFriendsToUsernames,
	usernamesToFriends,
} from "../lib/transformations";
import Friend from "../models/Friend.model";
import { TimeframeService } from "./timeframe.service";
import {
	getFirstOfYear,
	getLastFriday,
	intervalKey,
	partial,
	partialR,
} from "../lib/utils";

@Injectable({
	providedIn: "root",
})
export class FriendsService {
	friends: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);

	constructor(
		private lastService: LastService,
		private timeframeService: TimeframeService
	) {
		this.fillBlankFriends = this.fillBlankFriends.bind(this);
		this.getTracks = this.getTracks.bind(this);
		this.friends.next = this.friends.next.bind(this.friends);
	}

	fillBlankFriends(usernames: string[]): void {
		const emptyFriends = usernames.map(name => new Friend(name));
		this.friends.next(emptyFriends);
	}

	updateTimeframe(from: Date, to: Date): void {
		this.friends
			.pipe(first((friends: Friend[]) => friends.length > 0))
			.subscribe((friends: Friend[]) => {
				fromArray(friends)
					.pipe(
						mergeMap((friend: Friend) =>
							this.getTracks(friend, from, to)
						)
					)
					.subscribe(partial(this.friends.next, friends));
			});
	}

	private getTracks(
		friend: Friend,
		from: Date,
		to: Date
	): Observable<Friend> {
		const key = intervalKey(from, to);
		return this.lastService
			.getTracksRx(friend.username, from, to)
			.pipe(map(partial(hydrateUserTracks, friend, key)));
	}

	getFriends(username): void {
		const addUsername = (usernames: string[]) => {
			usernames.push(username);
			return usernames;
		};
		this.lastService
			.getFriendsRx(username)
			.pipe(
				map(lastFriendsToUsernames),
				map(addUsername),
				map(usernamesToFriends)
			)
			.subscribe(this.friends.next);
	}
}
