import { Component, Input, OnInit } from "@angular/core";
import Friend from "../../models/Friend.model";
import {
	EXPLR_FM_USER_URL,
	LAST_FM_USER_URL,
	SERGEI_USER_URL,
	SCATTER_FM_USER_URL,
	LAST_MILESTONES_USER_URL,
} from "../../lib/constants";

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

	LAST_FM_USER_URL: string = LAST_FM_USER_URL;
	EXPLR_FM_USER_URL: string = EXPLR_FM_USER_URL;
	SERGEI_USER_URL: string = SERGEI_USER_URL;
	LAST_MILESTONES_USER_URL: string = LAST_MILESTONES_USER_URL;
	SCATTER_FM_USER_URL: string = SCATTER_FM_USER_URL;

	constructor() {}

	ngOnInit() {}
}
