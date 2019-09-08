import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FriendsService } from "../../services/friends.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
	username: string;
	message: string;
	subscription: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private friendService: FriendsService
	) {}
	ngOnInit(): void {
		this.subscription = this.route.queryParams.subscribe(
			this.retrieveMsg.bind(this)
		);
		this.friendService.getFriends("asontehusnth").subscribe(friends => {
			console.log(friends);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	retrieveMsg(params: Params): void {
		if (params.message) {
			this.message = params.message;
			this.router.navigate(["home"]);
		}
	}

	submit(): void {
		this.router.navigate(["user", this.username]);
	}
}
