import { Component, OnInit } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import Utils from "../../lib/Utils";

@Component({
	selector: "app-last-period",
	templateUrl: "./last-period.component.html",
	styleUrls: ["./last-period.component.css"],
})
export class LastPeriodComponent extends PeriodBaseComponent {
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

	reload(): void {
		let to: Date;
		let from: Date;

		switch (this.timeframe) {
			case "week":
				to = Utils.getLastFriday();
				from = new Date(to);
				from.setDate(to.getDate() - 7);
				break;
			case "month":
				to = Utils.getFirstOfMonth();
				from = new Date(to);
				from.setMonth(to.getMonth() - 1);
				break;
			case "year":
				to = Utils.getFirstOfYear();
				from = new Date(to);
				from.setFullYear(to.getFullYear() - 1);
				break;
		}
		this.loadUsers(from, to);
	}
}
