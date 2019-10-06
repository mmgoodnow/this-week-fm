import { Injectable } from "@angular/core";
import { LastService } from "./last.service";
import {
	BehaviorSubject,
	from as fromArray,
	Observable,
	Subscription,
} from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import {
	lastFriendsToUsernames,
	usernamesToFriends,
} from "../lib/transformations";
import Friend from "../models/Friend.model";
import { TimeframeService } from "./timeframe.service";
import { getLastFriday, partialR } from "../lib/utils";

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
		console.log = console.log.bind(console);
		this.getFriends("mmgoodnow").subscribe(this.friends.next);
		this.updateTimeframe(getLastFriday(), getLastFriday());
	}

	fillBlankFriends(usernames: string[]): void {
		const emptyFriends = usernames.map(name => new Friend(name));
		this.friends.next(emptyFriends);
	}

	updateTimeframe(from: Date, to: Date): void {
		this.friends.subscribe(friends => {
			fromArray(friends)
				.pipe(mergeMap(partialR(this.getTracks, from, to)))
				.subscribe(console.log);
		});
	}

	getTracks(friend: Friend, from: Date, to: Date): Observable<Friend> {
		return this.lastService
			.getTracksRx(friend.username, from, to)
			.pipe(tap(console.log));
	}

	getFriends(username): Observable<Friend[]> {
		return this.lastService.getFriendsRx(username).pipe(
			map(lastFriendsToUsernames),
			map(usernamesToFriends),
			tap(console.log)
		);
	}
}
