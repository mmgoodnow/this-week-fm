import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MainComponent } from "../main/main.component";
import { FriendsService } from "../../services/friends.service";
import { UserService } from "../../services/user.service";

@Injectable()
export abstract class PeriodBaseComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription;

	timeframe: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private parent: MainComponent,
		private friendsService: FriendsService,
		private userService: UserService
	) {
		this.subscriptions = new Subscription();
		this.didReceiveParams = this.didReceiveParams.bind(this);
	}

	ngOnInit() {
		this.subscriptions.add(
			this.route.parent.params.subscribe(this.didReceiveParams)
		);
		this.subscriptions.add(
			this.route.params.subscribe(this.didReceiveParams)
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	protected setUsername(username: string): void {
		this.userService.next(username);
	}

	protected didReceiveParams(params: Params): void {
		const { timeframe, username } = params;
		this.setUsername(username);
		if (timeframe) this.timeframe = timeframe;
		this.reload();
	}

	abstract reload(): void;

	loadUsers(from: Date, to: Date): void {
		this.friendsService.update(from, to);
	}
}
