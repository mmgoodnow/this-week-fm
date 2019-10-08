import { Component, OnInit } from "@angular/core";
import { FriendsService } from "../../services/friends.service";
import { getFirstOfYear, getLastFriday, intervalKey } from "../../lib/utils";
import { downloadAsCSV } from "../../lib/csv";
import { first } from "rxjs/operators";
import { interval } from "rxjs";

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
	ngOnInit() {
		this.friendsService.getFriends("mmgoodnow");
	}

	run() {
		this.friendsService.updateTimeframe(getFirstOfYear(), getLastFriday());
	}

	toggle(): void {
		this.showCode = !this.showCode;
	}

	get rangeCode() {
		return intervalKey(this.from, this.to);
	}

	downloadCsv(): void {
		this.friendsService.friends
			.pipe(first())
			.subscribe(friends =>
				downloadAsCSV(
					"last_fm_friends.csv",
					friends,
					intervalKey(this.from, this.to)
				)
			);
	}
}
