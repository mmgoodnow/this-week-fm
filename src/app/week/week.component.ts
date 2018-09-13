import { Component, OnInit } from "@angular/core";
import { LastService } from "../last.service";

@Component({
	selector: "app-week",
	templateUrl: "./week.component.html",
	styleUrls: ["./week.component.css"],
})
export class WeekComponent implements OnInit {
	constructor(private service: LastService) {}

	ngOnInit() {
		this.service
			.getThisWeekTracks("mmgoodnow")
			.then(tracks => console.log(tracks));
	}
}
