import { Component, OnInit } from "@angular/core";
import { LastService } from "../last.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-week",
	templateUrl: "./week.component.html",
	styleUrls: ["./week.component.css"],
})
export class WeekComponent implements OnInit {
	constructor(private service: LastService, private route: ActivatedRoute) {
		this.setParams = this.setParams.bind(this);
		this.route.params.subscribe(params => this.setParams(params));
	}

	user: any;
	friends: any[];
	filled: number;
	lastUpdated: string;

	ngOnInit() {}

	private setParams(params) {
		this.user = {};
		this.user.name = params.userId;
		this.loadUsers();
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

	private loadUsers() {
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
								.getThisWeekTracks(
									user.name,
									this.getLastFriday(),
									new Date()
								)
								.then(res => {
									user.thisWeekTracks = Number(
										res.recenttracks["@attr"].total
									);
									this.filled++;
								})
						)
					)
			);
	}
}
