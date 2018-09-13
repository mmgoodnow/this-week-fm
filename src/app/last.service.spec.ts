import { TestBed } from "@angular/core/testing";

import { LastService } from "./last.service";

describe("LastService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: LastService = TestBed.get(LastService);
		expect(service).toBeTruthy();
	});
});
