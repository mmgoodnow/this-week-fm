import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";

@Pipe({
	name: "sort",
	pure: false,
})
export class SortPipe implements PipeTransform {
	transform(friends: Friend[], rangeCode: string): any {
		const compare = (f1: Friend, f2: Friend): number =>
			f2.tracks.get(rangeCode).tracks - f1.tracks.get(rangeCode).tracks;
		return friends.slice().sort(compare);
	}
}
