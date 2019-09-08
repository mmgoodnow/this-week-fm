import { Component, OnInit } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import Utils from "../../lib/Utils";
import * as moment from "moment-mini";

@Component({
	selector: "app-this-period",
	templateUrl: "./this-period.component.html",
	styleUrls: ["./this-period.component.css"],
})
export class ThisPeriodComponent extends PeriodBaseComponent {
	private _lastUpdated: Date;
	concise = false;

	reload(): void {
		let from: Date;
		let to: Date;
		switch (this.timeframe) {
			case "week":
				from = Utils.getLastFriday();
				to = new Date(from);
				to.setDate(from.getDate() + 7);
				break;
			case "month":
				from = Utils.getFirstOfMonth();
				to = new Date(from);
				to.setMonth(from.getMonth() + 1);
				break;
			case "year":
				from = Utils.getFirstOfYear();
				to = new Date(from);
				to.setFullYear(from.getFullYear() + 1);
				break;
		}
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
