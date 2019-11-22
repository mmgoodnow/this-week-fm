import { TrackPipe } from "./track.pipe";

describe("TrackPipe", () => {
	it("create an instance", () => {
		const pipe = new TrackPipe();
		expect(pipe).toBeTruthy();
	});
});
