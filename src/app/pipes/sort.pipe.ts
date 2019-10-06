import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";

@Pipe({
	name: "sort",
	pure: false,
})
export class SortPipe implements PipeTransform {
	transform(friends: Friend[], rangeCode: string): any {
		const compare = (f1: Friend, f2: Friend): number => {
			const tracks1 = f1.safeGetTracks(rangeCode);
			const tracks2 = f2.safeGetTracks(rangeCode);
			return tracks2 - tracks1;
		};
		return friends.slice().sort(compare);
	}
}
