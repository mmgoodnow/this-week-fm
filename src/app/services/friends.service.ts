import { Injectable } from "@angular/core";
import { LastService } from "./last.service";
import { BehaviorSubject, from as fromArray, Observable, of } from "rxjs";
import { catchError, first, map, mergeMap } from "rxjs/operators";
import {
	handleUserTracksError,
	hydrateUserTracks,
	lastFriendsToUsernames,
	usernamesToFriends,
} from "../lib/transformations";
import Friend from "../models/Friend.model";
import { intervalKey, partial } from "../lib/utils";
import { UserService } from "./user.service";
import { NO_SUCH_PAGE } from "../lib/constants";

@Injectable({
	providedIn: "root",
})
export class FriendsService {
	friends: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);

	constructor(
		private lastService: LastService,
		private userService: UserService
	) {
		this.fillBlankFriends = this.fillBlankFriends.bind(this);
		this.getTracks = this.getTracks.bind(this);
		this.friends.next = this.friends.next.bind(this.friends);
		this.getFriends = this.getFriends.bind(this);
		this.userService.subscribe(this.getFriends);
	}

	fillBlankFriends(usernames: string[]): void {
		const emptyFriends = usernames.map(name => new Friend(name));
		this.friends.next(emptyFriends);
	}

	update(from: Date, to: Date): void {
		if (!from || !to) return;
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

	getFriends(username): void {
		const addUsername = (usernames: string[]) => {
			usernames.push(username);
			return usernames;
		};
		this.friends.next([]);
		this.lastService
			.getFriends(username)
			.pipe(
				map(lastFriendsToUsernames),
				catchError(error => {
					if (
						error.error.error === 6 &&
						error.error.message === NO_SUCH_PAGE
					) {
						return of([]);
					}
					throw error;
				}),
				map(addUsername),
				map(usernamesToFriends)
			)
			.subscribe(this.friends.next);
	}

	private getTracks(
		friend: Friend,
		from: Date,
		to: Date
	): Observable<Friend> {
		const key = intervalKey(from, to);
		return this.lastService.getTracks(friend.username, from, to).pipe(
			map(partial(hydrateUserTracks, friend, key)),
			catchError(partial(handleUserTracksError, friend))
		);
	}
}
