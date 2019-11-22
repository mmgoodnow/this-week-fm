import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";
import Track from "../models/Track.model";

@Pipe({
	name: "lastTrack",
	pure: false,
})
export class LastTrackPipe implements PipeTransform {
	transform(friend: Friend, rangeCode: string): Track {
		return (
			friend.tracks.get(rangeCode) &&
			friend.tracks.get(rangeCode).lastTrack
		);
	}
}
