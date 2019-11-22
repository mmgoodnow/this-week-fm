import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ThisPeriodComponent } from "./this-period.component";

describe("ThisPeriodComponent", () => {
	let component: ThisPeriodComponent;
	let fixture: ComponentFixture<ThisPeriodComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ThisPeriodComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ThisPeriodComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
