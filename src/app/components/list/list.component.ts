import { Component, Input } from "@angular/core";
import { FriendsService } from "../../services/friends.service";
import { intervalKey } from "../../lib/utils";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

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

	faPlayCircle = faPlayCircle;

	constructor(public friendsService: FriendsService) {}

	get intervalKey() {
		return intervalKey(this.from, this.to);
	}
}
