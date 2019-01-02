import { Component, OnInit } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import Utils from "../Utils";

@Component({
	selector: "app-this-period",
	templateUrl: "./this-period.component.html",
	styleUrls: ["./this-period.component.css"],
})
export class ThisPeriodComponent extends PeriodBaseComponent {
	lastUpdated: string;
	concise = true;

	reload(): void {
		let from: Date;

		switch (this.timeframe) {
			case "week":
				from = Utils.getLastFriday();
				break;
			case "month":
				from = Utils.getFirstOfMonth();
				break;
			case "year":
				from = Utils.getFirstOfYear();
				break;
			default:
				console.log(this.timeframe);
		}
		const to = new Date();
		this.loadUsers(from, to);
	}

	loadUsers(from: Date, to: Date) {
		this.lastUpdated = new Date().toString().substring(0, 21);
		super.loadUsers(from, to);
	}
}
