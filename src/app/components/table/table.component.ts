import { Component, Input, OnInit } from "@angular/core";
import Friend from "../../models/Friend.model";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
	@Input()
	friends: Friend[];

	ngOnInit() {}
}
