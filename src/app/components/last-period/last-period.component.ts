import { Component } from "@angular/core";
import { PeriodBaseDirective } from "../../directives/period-base/period-base.directive";
import {
	getFirstOfMonth,
	getFirstOfYear,
	getLastFriday,
	intervalKey,
} from "../../lib/utils";

@Component({
	selector: "app-last-period",
	templateUrl: "./last-period.component.html",
	styleUrls: ["./last-period.component.css"],
})
export class LastPeriodComponent extends PeriodBaseDirective {
	to: Date;
	from: Date;

	get rangeCode() {
		return intervalKey(this.from, this.to);
	}

	reload(): void {
		switch (this.timeframe) {
			case "week":
				this.to = getLastFriday();
				this.from = new Date(this.to);
				this.from.setDate(this.to.getDate() - 7);
				break;
			case "month":
				this.to = getFirstOfMonth();
				this.from = new Date(this.to);
				this.from.setMonth(this.to.getMonth() - 1);
				break;
			case "year":
				this.to = getFirstOfYear();
				this.from = new Date(this.to);
				this.from.setFullYear(this.to.getFullYear() - 1);
				break;
		}
		this.loadUsers(this.from, this.to);
	}
}
