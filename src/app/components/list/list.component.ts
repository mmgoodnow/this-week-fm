import { Component, Input } from "@angular/core";
import { FriendsService } from "../../services/friends.service";
import { intervalKey } from "../../lib/utils";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.css"],
})
export class ListComponent {
	@Input()
	concise: boolean;

	@Input()
	from: Date;

	@Input()
	to: Date;

	constructor(public friendsService: FriendsService) {}

	get intervalKey() {
		return intervalKey(this.from, this.to);
	}
}
