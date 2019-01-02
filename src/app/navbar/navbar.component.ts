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
	activeLink: number;

	private subscriptions: Subscription;

	constructor(private route: ActivatedRoute) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this.subscriptions.add(
			this.route.params.subscribe(this.setUsername.bind(this))
		);
		const href = window.location.href;
		if (href.includes("/this/week")) {
			this.select(0);
		} else if (href.includes("/last/week")) {
			this.select(1);
		} else if (href.includes("/this/month")) {
			this.select(2);
		} else if (href.includes("/last/month")) {
			this.select(3);
		} else if (href.includes("/this/year")) {
			this.select(4);
		} else if (href.includes("/last/year")) {
			this.select(5);
		}
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	setUsername(params: any) {
		this.username = params.username;
	}

	select(link): void {
		this.activeLink = link;
	}
}
