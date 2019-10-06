import { TestBed } from "@angular/core/testing";

import { TimeframeService } from "./timeframe.service";

describe("TimeframeService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: TimeframeService = TestBed.get(TimeframeService);
		expect(service).toBeTruthy();
	});
});
