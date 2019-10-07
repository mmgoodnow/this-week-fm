import { Pipe, PipeTransform } from "@angular/core";
import Track from "../models/Track.model";
import * as moment from "moment-mini";

@Pipe({
	name: "relativeDate",
	pure: false,
})
export class RelativeDatePipe implements PipeTransform {
	transform(track: Track): string {
		return moment(track.date).fromNow();
	}
}
