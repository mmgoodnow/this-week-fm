import { Component, Input, OnInit } from "@angular/core";
import Friend from "../../models/Friend.model";
import { FriendsService } from "../../services/friends.service";
import { intervalKey } from "../../lib/utils";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
	@Input()
	friends: Friend[];

	@Input()
	from: Date;

	@Input()
	to: Date;

	constructor(private friendsService: FriendsService) {}

	ngOnInit() {}

	get intervalKey() {
		return intervalKey(this.from, this.to);
	}
}
