import { Component, OnDestroy, OnInit } from "@angular/core";
import { LastService } from "../last.service";
import { ActivatedRoute, Router } from "@angular/router";
import IntervalTracks from "../models/IntervalTracks.model";
import Utils from "../Utils";
import Friend from "../models/Friend.model";
import User from "../models/User.model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-week",
	templateUrl: "./week.component.html",
	styleUrls: ["./week.component.css"],
})
export class WeekComponent implements OnInit, OnDestroy {
	user: User;
	friends: Friend[];
	filled: boolean;
	lastUpdated: string;
	currentWeek: boolean;
	concise: boolean;
	subscriptions: Subscription;

	constructor(
		private service: LastService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.subscriptions = new Subscription();
	}

	ngOnInit(): void {
		this.route.params.subscribe(this.setParams.bind(this));
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private setParams(params) {
		this.user = new User(params.userId);
		if (params.timeframe) {
			if (params.timeframe === "this-week") {
				this.currentWeek = true;
			} else if (params.timeframe === "last-week") {
				this.currentWeek = false;
			} else {
				this.router.navigate(["user", this.user.username]);
			}
		} else {
			this.currentWeek = true;
		}
		this.reload();
	}

	reload() {
		if (this.currentWeek) {
			const from = Utils.getLastFriday();
			const to = new Date();
			this.loadUsers(from, to);
		} else {
			const to = Utils.getLastFriday();
			const from = Utils.getLastFriday();
			from.setDate(to.getDate() - 7);
			this.loadUsers(from, to);
		}
	}

	loadUsers(from: Date, to: Date) {
		this.friends = [];
		this.filled = false;
		this.lastUpdated = new Date().toString().substring(0, 21);
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
