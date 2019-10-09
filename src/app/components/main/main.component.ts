import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.css"],
})
export class MainComponent {
	username: string;

	params: Observable<Params>;

	constructor(private route: ActivatedRoute) {
		this.params = this.route.params;
	}
}
