import { Component, Input, OnInit } from "@angular/core";
import Friend from "../models/Friend.model";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
	options = {
		fieldSeparator: ",",
		quoteStrings: '"',
		decimalseparator: ".",
		showLabels: false,
		headers: ["Username", "Tracks"],
		showTitle: false,
		useBom: false,
		removeNewLines: true,
		keys: ["username", "tracks"],
	};

	@Input()
	friends: Friend[];

	ngOnInit() {}
}
