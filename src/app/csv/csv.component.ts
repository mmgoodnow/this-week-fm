import { Component, OnInit } from "@angular/core";
import { Angular2CsvComponent } from "angular2-csv";

@Component({
	selector: "app-csv",
	templateUrl: "./csv.component.html",
	styleUrls: ["./csv.component.css"],
})
export class CsvComponent extends Angular2CsvComponent {
	constructor() {
		super();
	}
}
