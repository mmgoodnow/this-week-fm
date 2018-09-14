import { Component, OnInit } from "@angular/core";
import { LastService } from "../last.service";
import { Router, ActivatedRoute } from "@angular/router";

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

	ngOnInit() {}

	private setParams(params) {
		this.user = params.userId;
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
		lastFriday.setDate(-7);
		console.log(lastFriday);
		return lastFriday;
	}

	public get sortedFriends(): any[] {
		this.friends.sort((a, b) => b.thisWeekTracks - a.thisWeekTracks);
		return this.friends;
	}

	private loadUsers() {
		this.friends = [];

		this.service
			.getInfo(this.user)
			.then(res => {
				console.log(res);
				this.user = res.user;
				this.friends.push(res.user);
			})
			.then(() =>
				this.service
					.getFriends(this.user.name)
					.then(res => {
						console.log(res);
						this.friends.push(...res.friends.user);
					})
					.then(() => {
						for (let i = 0; i < this.friends.length; i++) {
							const arr = this.friends;
							const user = arr[i];
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
								});
						}
					})
			);
	}
}
