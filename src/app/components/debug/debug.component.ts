import { Component, OnInit } from "@angular/core";
import { FriendsService } from "../../services/friends.service";

@Component({
	selector: "app-debug",
	templateUrl: "./debug.component.html",
	styleUrls: ["./debug.component.css"],
})
export class DebugComponent implements OnInit {
	constructor(private friendsService: FriendsService) {}

	ngOnInit() {}

	run() {}
}
