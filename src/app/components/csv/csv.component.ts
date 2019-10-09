import { Component, Input } from "@angular/core";
import { first } from "rxjs/operators";
import { downloadAsCSV } from "../../lib/csv";
import { FriendsService } from "../../services/friends.service";

@Component({
	selector: "app-csv",
	templateUrl: "./csv.component.html",
	styleUrls: ["./csv.component.css"],
})
export class CsvComponent {
	@Input()
	rangeCode: string;
	constructor(private friendsService: FriendsService) {}

	downloadCsv(): void {
		this.friendsService.friends
			.pipe(first())
			.subscribe(friends =>
				downloadAsCSV("last_fm_friends.csv", friends, this.rangeCode)
			);
	}
}
