import Friend from "../models/Friend.model";
import { partial } from "./utils";

function toCSVString(friends: Friend[], rangeCode: string): string {
	return friends
		.slice()
		.sort(partial(Friend.compareByTracks, rangeCode))
		.reduce((acc: string, friend: Friend) => {
			if (friend.doesShowPublicData === false) return acc;
			const { username } = friend;
			const tracks = friend.safeGetTracks(rangeCode);
			return `${acc}${username},${tracks}\n`;
		}, "Username,Tracks\n");
}

export function downloadAsCSV(
	filename: string,
	friends: Friend[],
	rangeCode
): void {
	const csv = toCSVString(friends, rangeCode);
	const link = document.createElement("a");
	link.setAttribute("target", "_blank");
	if (Blob !== undefined) {
		const blob = new Blob([csv], { type: "text/csv" });
		link.setAttribute("href", URL.createObjectURL(blob));
	} else {
		link.setAttribute("href", `data:text/csv,${encodeURIComponent(csv)}`);
	}
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
