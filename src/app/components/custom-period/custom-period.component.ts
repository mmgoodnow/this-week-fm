import { Component } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import { Params } from "@angular/router";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { intervalKey } from "../../lib/utils";

@Component({
	selector: "app-custom-period",
	templateUrl: "./custom-period.component.html",
	styleUrls: ["./custom-period.component.css"],
})
export class CustomPeriodComponent extends PeriodBaseComponent {
	fromStr: NgbDate;
	toStr: NgbDate;

	from: Date;
	to: Date;

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

	get intervalKey() {
		return intervalKey(this.from, this.to);
	}
}
