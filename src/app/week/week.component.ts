import { Component, OnInit } from "@angular/core";
import { LastService } from "../last.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Friend, IntervalTracks, User } from "../models";
import Utils from "../Utils";

@Component({
	selector: "app-week",
	templateUrl: "./week.component.html",
	styleUrls: ["./week.component.css"],
})
export class WeekComponent implements OnInit {
	constructor(
		private service: LastService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.setParams = this.setParams.bind(this);
		this.route.params.subscribe(params => this.setParams(params));
	}

	user: User;
	friends: Friend[];
	filled: boolean;
	lastUpdated: string;
	currentWeek: boolean;

	private static getLastFriday(): Date {
		const now = new Date();
		const diff = (7 - 5 + now.getDay()) % 7;
		const lastFriday = new Date();
		lastFriday.setDate(now.getDate() - diff);
		lastFriday.setHours(0);
		lastFriday.setMinutes(0);
		lastFriday.setSeconds(0);
		lastFriday.setMilliseconds(0);
		return lastFriday;
	}

	ngOnInit() {}

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
			const from = WeekComponent.getLastFriday();
			const to = new Date();
			this.loadUsers(from, to);
		} else {
			const to = WeekComponent.getLastFriday();
			const from = WeekComponent.getLastFriday();
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
