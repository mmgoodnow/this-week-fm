import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	isCollapsed = true;
	username: string;

	constructor(route: ActivatedRoute) {
		route.params.subscribe(this.setUsername.bind(this));
	}

	ngOnInit() {}

	setUsername(params: any) {
		this.username = params.username;
	}
}
