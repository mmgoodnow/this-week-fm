import { Component, OnInit } from "@angular/core";
import { LastService } from "../last.service";
import { ActivatedRoute, Router } from "@angular/router";

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

	user: any;
	friends: any[];
	filled: number;
	lastUpdated: string;
	currentWeek: boolean;

	ngOnInit() {}

	private setParams(params) {
		this.user = {};
		this.user.name = params.userId;
		if (params.timeframe) {
			if (params.timeframe === "this-week") {
				this.currentWeek = true;
			} else if (params.timeframe === "last-week") {
				this.currentWeek = false;
			} else {
				this.router.navigate(["user", this.user.name]);
			}
		} else {
			this.currentWeek = true;
		}
		this.reload();
	}

	private getLastFriday(): Date {
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

	public get sortedFriends(): any[] {
		if (this.filled === this.friends.length && this.filled !== 0) {
			this.friends.sort((a, b) => b.thisWeekTracks - a.thisWeekTracks);
			this.filled++;
		}
		return this.friends;
	}

	reload() {
		if (this.currentWeek) {
			const from = this.getLastFriday();
			const to = new Date();
			this.loadUsers(from, to);
		} else {
			const to = this.getLastFriday();
			const from = this.getLastFriday();
			from.setDate(to.getDate() - 7);
			this.loadUsers(from, to);
		}
	}

	loadUsers(from: Date, to: Date) {
		this.friends = [];
		this.filled = 0;
		this.lastUpdated = new Date().toString().substring(0, 21);
		this.service
			.getInfo(this.user.name)
			.then(res => {
				this.user = res.user;
				this.friends.push(res.user);
			})
			.then(() =>
				this.service
					.getFriends(this.user.name)
					.then(res => {
						this.friends.push(...res.friends.user);
					})
					.then(() =>
						this.friends.forEach((user, i, arr) =>
							this.service
								.getThisWeekTracks(user.name, from, to)
								.then(res => {
									user.thisWeekTracks = Number(
										res.recenttracks["@attr"].total
									);
									user.tracksPerDay = Math.round(
										user.thisWeekTracks /
											((to.valueOf() - from.valueOf()) /
												86400000)
									);
									this.filled++;
								})
						)
					)
			);
	}
}
