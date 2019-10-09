import { Component } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import { Params } from "@angular/router";
import User from "../../models/User.model";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-custom-period",
	templateUrl: "./custom-period.component.html",
	styleUrls: ["./custom-period.component.css"],
})
export class CustomPeriodComponent extends PeriodBaseComponent {
	fromStr: NgbDate;
	toStr: NgbDate;
	content: boolean;

	from: Date;
	to: Date;

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
		this.content = true;
		const f = this.fromStr;
		const t = this.toStr;

		this.from = new Date(f.year, f.month - 1, f.day);
		this.to = new Date(t.year, t.month - 1, t.day + 1);
		this.loadUsers(this.from, this.to);
	}

	protected setParams(params: Params): void {
		if (params.username) {
			this.user = new User(params.username);
		}
	}
}
