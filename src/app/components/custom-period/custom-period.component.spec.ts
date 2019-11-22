import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomPeriodComponent } from "./custom-period.component";

describe("CustomPeriodComponent", () => {
	let component: CustomPeriodComponent;
	let fixture: ComponentFixture<CustomPeriodComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CustomPeriodComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomPeriodComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
