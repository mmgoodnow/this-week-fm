import { Component } from "@angular/core";
import { PeriodBaseDirective } from "../../directives/period-base/period-base.directive";
import { Params } from "@angular/router";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { intervalKey } from "../../lib/utils";

@Component({
	selector: "app-custom-period",
	templateUrl: "./custom-period.component.html",
	styleUrls: ["./custom-period.component.css"],
})
export class CustomPeriodComponent extends PeriodBaseDirective {
	fromStr: NgbDate;
	toStr: NgbDate;

	from: Date;
	to: Date;

	get intervalKey() {
		return intervalKey(this.from, this.to);
	}

	reload(): void {
		const f = this.fromStr;
		const t = this.toStr;

		this.from = new Date(f.year, f.month - 1, f.day);
		this.to = new Date(t.year, t.month - 1, t.day + 1);
		this.loadUsers(this.from, this.to);
	}

	protected didReceiveParams(params: Params): void {
		this.setUsername(params.username);
	}
}
