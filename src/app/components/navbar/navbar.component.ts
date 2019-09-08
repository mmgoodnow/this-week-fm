import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
	isCollapsed = true;
	constructor() {}
}
