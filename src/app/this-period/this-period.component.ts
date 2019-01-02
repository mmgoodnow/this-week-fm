import { Component, OnInit } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import Utils from "../Utils";
import * as moment from "moment-mini";

@Component({
	selector: "app-this-period",
	templateUrl: "./this-period.component.html",
	styleUrls: ["./this-period.component.css"],
})
export class ThisPeriodComponent extends PeriodBaseComponent {
	private _lastUpdated: Date;
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
		}
		const to = new Date();
		this.loadUsers(from, to);
	}

	loadUsers(from: Date, to: Date) {
		this._lastUpdated = new Date();
		super.loadUsers(from, to);
	}

	get lastUpdated(): string {
		return moment(this._lastUpdated).fromNow();
	}
}
