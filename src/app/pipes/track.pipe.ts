import { Pipe, PipeTransform } from "@angular/core";
import Track from "../models/Track.model";

@Pipe({
	name: "track",
	pure: true,
})
export class TrackPipe implements PipeTransform {
	transform(track: Track): any {
		return `${track.artist} - ${track.name}`;
	}
}
