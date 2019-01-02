import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PeriodBaseComponent } from "./period-base.component";

describe("PeriodBaseComponent", () => {
	let component: PeriodBaseComponent;
	let fixture: ComponentFixture<PeriodBaseComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PeriodBaseComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PeriodBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
