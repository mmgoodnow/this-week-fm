import { Component } from "@angular/core";
import { PeriodBaseDirective } from "../../directives/period-base/period-base.directive";
import * as moment from "moment-mini";
import {
	getFirstOfMonth,
	getFirstOfYear,
	getLastFriday,
} from "../../lib/utils";

@Component({
	selector: "app-this-period",
	templateUrl: "./this-period.component.html",
	styleUrls: ["./this-period.component.css"],
})
export class ThisPeriodComponent extends PeriodBaseDirective {
	concise = false;
	from: Date;
	to: Date;

	private _lastUpdated: Date;

	get lastUpdated(): string {
		return moment(this._lastUpdated).fromNow();
	}

	reload(): void {
		switch (this.timeframe) {
			case "week":
				this.from = getLastFriday();
				this.to = new Date(this.from);
				this.to.setDate(this.from.getDate() + 7);
				break;
			case "month":
				this.from = getFirstOfMonth();
				this.to = new Date(this.from);
				this.to.setMonth(this.from.getMonth() + 1);
				break;
			case "year":
				this.from = getFirstOfYear();
				this.to = new Date(this.from);
				this.to.setFullYear(this.from.getFullYear() + 1);
				break;
		}
		this.loadUsers(this.from, this.to);
	}

	loadUsers(from: Date, to: Date) {
		this._lastUpdated = new Date();
		super.loadUsers(from, to);
	}
}
