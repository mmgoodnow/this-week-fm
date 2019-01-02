import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import IntervalTracks from "../models/IntervalTracks.model";
import Friend from "../models/Friend.model";
import Utils from "../Utils";
import User from "../models/User.model";
import { LastService } from "../last.service";
import { MainComponent } from "../main/main.component";

@Injectable()
export class PeriodBaseComponent implements OnInit {
	private subscriptions: Subscription;

	user: User;
	friends: Friend[];
	filled: boolean;
	username: string;

	constructor(
		private service: LastService,
		private router: Router,
		private parent: MainComponent
	) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this.user = new User(this.parent.username);
	}

	loadUsers(from: Date, to: Date) {
		this.friends = [];
		this.filled = false;
		this.friends.push(this.user.reset());
		let promises: Promise<IntervalTracks>[] = [];
		this.service
			.getFriends(this.user.username)
			.then((friends: Friend[]) => {
				if (!friends) {
					throw new Error("Username not found.");
				}
				this.friends.push(...friends);
			})
			.then(
				() =>
					(promises = this.friends.map((user: Friend) =>
						this.service.getTracks(user.username, from, to)
					))
			)
			.then(() => {
				Promise.all(promises).then(responses => {
					responses.forEach((tracks: IntervalTracks, i) => {
						const currentFriend: Friend = this.friends[i];
						Object.assign(currentFriend, tracks);
						currentFriend.tracksPerDay = Math.round(
							currentFriend.tracks /
								((to.valueOf() - from.valueOf()) / 86400000)
						);
					});
					this.friends.sort((a, b) => b.tracks - a.tracks);
					this.filled = true;
				});
			})
			.catch((error: Error) => {
				alert(error.message);
				if (error.message === "Username not found.") {
					return this.router.navigate(["/"]);
				}
				this.filled = true;
			})
			.catch(Utils.handleErrors);
	}
}
