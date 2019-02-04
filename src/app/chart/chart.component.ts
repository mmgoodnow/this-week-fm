import { Component, Input, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import Friend from "../models/Friend.model";
import * as palette from "google-palette";

@Component({
	selector: "app-chart",
	templateUrl: "./chart.component.html",
	styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit {
	@Input()
	friends: Friend[];

	@Input()
	from: Date;

	@Input()
	to: Date;

	constructor() {}

	ngOnInit() {
		const pal = palette("mpn65", this.friends.length).map(hex => "#" + hex);
		const chart = new Chart("chart", {
			type: "line",
			data: {
				datasets: this.friends.map((friend, index) => {
					return {
						label: friend.username,
						fill: false,
						pointRadius: 0,
						lineTension: 0,
						borderColor: pal[index],
						data: friend.tracksAsPoints(),
					};
				}),
			},
			options: {
				scales: {
					xAxes: [
						{
							type: "time",
							time: {
								round: "minute",
								unit: "day",
							},
							distribution: "linear",
						},
					],
				},
			},
		});
	}
}
