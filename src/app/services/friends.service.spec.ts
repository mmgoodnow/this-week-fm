import { TestBed } from "@angular/core/testing";

import { FriendsService } from "./friends.service";
import { HttpClient } from "@angular/common/http";

describe("FriendsService", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({ declarations: [HttpClient] }));

	it("should be created", () => {
		const service: FriendsService = TestBed.get(FriendsService);
		expect(service).toBeTruthy();
	});
});
