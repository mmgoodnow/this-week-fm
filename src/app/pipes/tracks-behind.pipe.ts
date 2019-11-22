import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";

@Pipe({
	name: "tracksBehind",
	pure: false,
})
export class TracksBehindPipe implements PipeTransform {
	transform(friend: Friend, competitor: Friend, rangeCode: string): any {
		const difference =
			competitor.safeGetTracks(rangeCode) -
			friend.safeGetTracks(rangeCode);
		return `${difference} behind ${competitor.username}`;
	}
}
