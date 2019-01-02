import { Component, Input, OnInit } from "@angular/core";
import Friend from "../models/Friend.model";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
	@Input()
	friends: Friend[];

	@Input()
	concise: boolean;

	constructor() {}

	ngOnInit() {}
}
