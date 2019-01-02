import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
	isCollapsed = true;
	username: string;

	private subscriptions: Subscription;

	constructor(private route: ActivatedRoute) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this.subscriptions.add(
			this.route.params.subscribe(this.setUsername.bind(this))
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	setUsername(params: any) {
		this.username = params.username;
	}
}
