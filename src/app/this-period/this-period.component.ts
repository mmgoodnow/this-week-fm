import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeriodBaseComponent } from "../period-base/period-base.component";
import Utils from "../Utils";

@Component({
	selector: "app-this-period",
	templateUrl: "./this-period.component.html",
	styleUrls: ["./this-period.component.css"],
})
export class ThisPeriodComponent extends PeriodBaseComponent implements OnInit {
	lastUpdated: string;
	concise: boolean;

	ngOnInit() {
		super.ngOnInit();
		this.reload();
	}

	reload(): void {
		const from = Utils.getLastFriday();
		const to = new Date();
		this.loadUsers(from, to);
	}
}
