import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";

@Pipe({
	name: "tracks",
	pure: false,
})
export class TracksPipe implements PipeTransform {
	transform(friend: Friend, rangeCode: string): any {
		return friend.safeGetTracks(rangeCode);
	}
}
