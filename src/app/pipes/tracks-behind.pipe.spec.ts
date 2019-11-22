import { TracksBehindPipe } from "./tracks-behind.pipe";

describe("TracksBehindPipe", () => {
	it("create an instance", () => {
		const pipe = new TracksBehindPipe();
		expect(pipe).toBeTruthy();
	});
});
