import { Component, Input } from "@angular/core";
import {
	EXPLR_FM_USER_URL,
	LAST_FM_USER_URL,
	SCATTER_FM_USER_URL,
	SERGEI_USER_URL,
} from "src/app/lib/constants";

@Component({
	selector: "app-links",
	templateUrl: "./links.component.html",
	styleUrls: ["./links.component.css"],
})
export class LinksComponent {
	@Input()
	username: string;

	LAST_FM_USER_URL: string = LAST_FM_USER_URL;
	EXPLR_FM_USER_URL: string = EXPLR_FM_USER_URL;
	SERGEI_USER_URL: string = SERGEI_USER_URL;
	SCATTER_FM_USER_URL: string = SCATTER_FM_USER_URL;
}
