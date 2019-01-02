import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription;
	username: string;

	constructor(private route: ActivatedRoute) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this.subscriptions.add(
			this.route.params.subscribe(this.setUsername.bind(this))
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private setUsername(params: Params): void {
		this.username = params.username;
	}
}
