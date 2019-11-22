import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";
import { partial } from "../lib/utils";

@Pipe({
	name: "sort",
	pure: false,
})
export class SortPipe implements PipeTransform {
	transform(friends: Friend[], rangeCode: string): Friend[] {
		return friends.slice().sort(partial(Friend.compareByTracks, rangeCode));
	}
}
