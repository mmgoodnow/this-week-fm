import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FriendsService } from "../../services/friends.service";
import { Title } from "@angular/platform-browser";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
	username: string;
	error: string;
	subscription: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private friendService: FriendsService,
		private titleService: Title
	) {
		this.retrieveMsg = this.retrieveMsg.bind(this);
	}

	ngOnInit(): void {
		this.subscription = this.route.queryParams.subscribe(this.retrieveMsg);
		this.titleService.setTitle("this.week | Login");
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	retrieveMsg(params: Params): void {
		if (params.error) {
			this.error = params.error;
			this.router.navigate(["login"]);
		}
	}

	submit(): void {
		this.router.navigate(["user", this.username]);
	}
}
