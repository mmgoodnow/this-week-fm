import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import IntervalTracks from "../models/IntervalTracks.model";
import Friend from "../models/Friend.model";
import Utils from "../Utils";
import User from "../models/User.model";
import { LastService } from "../last.service";
import { MainComponent } from "../main/main.component";
import { USER_NOT_FOUND } from "../constants";

@Injectable()
export abstract class PeriodBaseComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription;

	user: User;
	friends: Friend[];
	filled: boolean;
	numFilled: number;
	timeframe: string;

	constructor(
		private service: LastService,
		private router: Router,
		private route: ActivatedRoute,
		private parent: MainComponent
	) {
		this.friends = [];
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this.subscriptions.add(
			this.parent.params.subscribe(this.setParams.bind(this))
		);
		this.subscriptions.add(
			this.route.params.subscribe(this.setParams.bind(this))
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	protected setParams(params: Params): void {
		if (params.timeframe) {
			this.timeframe = params.timeframe;
		}
		if (params.username) {
			this.user = new User(params.username);
		}
		if (this.timeframe && this.user) {
			this.reload();
		}
	}

	abstract reload(): void;

	loadUsers(from: Date, to: Date) {
		this.friends = [];
		this.filled = false;
		this.numFilled = 0;
		this.friends.push(this.user.reset());
		let promises: Promise<IntervalTracks>[] = [];
		this.service
			.getFriends(this.user.username)
			.then((friends: Friend[]) => {
				if (!friends) {
					throw new Error(USER_NOT_FOUND);
				}
				this.friends.push(...friends);
			})
			.then(
				() =>
					(promises = this.friends.map((user: Friend) =>
						this.service
							.getTracks(user.username, from, to)
							.then((res: IntervalTracks) => {
								this.numFilled++;
								return res;
							})
					))
			)
			.then(() => {
				Promise.all(promises).then(responses => {
					responses.forEach((tracks: IntervalTracks, i) => {
						const currentFriend: Friend = this.friends[i];
						Object.assign(currentFriend, tracks);
						const toDateValue = Math.min(
							to.valueOf(),
							new Date().valueOf()
						);
						currentFriend.tracksPerDay = Math.round(
							currentFriend.tracks /
								((toDateValue - from.valueOf()) / 86400000)
						);
					});
					this.friends.sort((a, b) => b.tracks - a.tracks);
					this.filled = true;
				});
			})
			.catch((error: Error) => {
				if (error.message === USER_NOT_FOUND) {
					return this.router.navigate(["/home"], {
						queryParams: { message: USER_NOT_FOUND },
					});
				} else throw error;
			})
			.catch(Utils.handleErrors);
	}
}
