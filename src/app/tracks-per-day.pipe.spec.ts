import { TracksPerDayPipe } from "./tracks-per-day.pipe";

describe("TracksPerDayPipe", () => {
	it("create an instance", () => {
		const pipe = new TracksPerDayPipe();
		expect(pipe).toBeTruthy();
	});
});
