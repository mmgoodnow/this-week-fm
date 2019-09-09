import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../models/Friend.model";

@Pipe({
	name: "sort",
	pure: false,
})
export class SortPipe implements PipeTransform {
	transform(friends: Friend[], ...args: any[]): any {
		console.log("sort pipe executing");
		return friends.slice().sort((f1, f2) => f2.tracks - f1.tracks);
	}
}
