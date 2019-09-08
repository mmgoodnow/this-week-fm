import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LastPeriodComponent } from "./last-period.component";

describe("LastPeriodComponent", () => {
	let component: LastPeriodComponent;
	let fixture: ComponentFixture<LastPeriodComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LastPeriodComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LastPeriodComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
