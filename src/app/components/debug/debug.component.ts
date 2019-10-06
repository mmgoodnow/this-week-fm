import { Component, OnInit } from "@angular/core";
import { FriendsService } from "../../services/friends.service";
import { getFirstOfYear, getLastFriday } from "../../lib/utils";

@Component({
	selector: "app-debug",
	templateUrl: "./debug.component.html",
	styleUrls: ["./debug.component.css"],
})
export class DebugComponent implements OnInit {
	constructor(private friendsService: FriendsService) {}
	showCode: boolean;
	from = getFirstOfYear();
	to = getLastFriday();
	ngOnInit() {}

	run() {
		this.friendsService.updateTimeframe(getFirstOfYear(), getLastFriday());
		this.friendsService.friends.subscribe(h =>
			console.log("hello", JSON.parse(JSON.stringify(h)))
		);
	}

	toggle() {
		this.showCode = !this.showCode;
	}
}
