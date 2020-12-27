import { Directive, Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { combineLatest, Subscription } from "rxjs";
import { MainComponent } from "../../components/main/main.component";
import { FriendsService } from "../../services/friends.service";
import { UserService } from "../../services/user.service";
import { Title } from "@angular/platform-browser";
import { pluck } from "rxjs/operators";

@Directive()
@Injectable()
export abstract class PeriodBaseDirective implements OnInit, OnDestroy {
	timeframe: string;
	pageTitle: string;
	private subscriptions: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private parent: MainComponent,
		private friendsService: FriendsService,
		private userService: UserService,
		private titleService: Title
	) {
		this.subscriptions = new Subscription();
		this.didReceiveParams = this.didReceiveParams.bind(this);
		this.setTitle = this.setTitle.bind(this);
	}

	ngOnInit() {
		this.subscriptions.add(
			combineLatest([
				this.route.parent.params.pipe(pluck("username")),
				this.route.params.pipe(pluck("timeframe")),
				this.route.url.pipe(pluck(0, "path")),
			]).subscribe(this.setTitle)
		);
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

	abstract reload(): void;

	setTitle([username, timeframe, currency]): void {
		this.pageTitle =
			currency === "custom"
				? `${username}'s custom range`
				: `${username}'s ${currency}.${timeframe}`;
		this.titleService.setTitle(this.pageTitle);
	}

	loadUsers(from: Date, to: Date): void {
		this.friendsService.update(from, to);
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
}
