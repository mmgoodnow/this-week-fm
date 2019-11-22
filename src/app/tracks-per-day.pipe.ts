import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "tracksPerDay",
})
export class TracksPerDayPipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		return null;
	}
}
