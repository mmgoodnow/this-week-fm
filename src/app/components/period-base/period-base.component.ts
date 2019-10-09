import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import User from "../../models/User.model";
import { LastService } from "../../services/last.service";
import { MainComponent } from "../main/main.component";

@Injectable()
export abstract class PeriodBaseComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription;

	user: User;
	timeframe: string;

	constructor(
		private service: LastService,
		private router: Router,
		private route: ActivatedRoute,
		private parent: MainComponent
	) {
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

	loadUsers(from: Date, to: Date): void {}
}
