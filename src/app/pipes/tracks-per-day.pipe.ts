import { Pipe, PipeTransform } from "@angular/core";
import { MS_PER_DAY } from "../lib/constants";

@Pipe({
	name: "tracksPerDay",
	pure: true,
})
export class TracksPerDayPipe implements PipeTransform {
	transform(tracks: number, from: Date, to: Date): any {
		const toInMs = Math.min(to.valueOf(), new Date().valueOf());
		const fromInMs = from.valueOf();
		const numDays = (toInMs - fromInMs) / MS_PER_DAY;
		return Math.round(tracks / numDays);
	}
}
