import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { WeekComponent } from "./week/week.component";
import { routing } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { TableComponent } from "./table/table.component";
import { ListComponent } from "./list/list.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2CsvModule } from "angular2-csv";
import { CsvComponent } from "./csv/csv.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MainComponent } from "./main/main.component";
import { ThisPeriodComponent } from "./this-period/this-period.component";
import { LastPeriodComponent } from "./last-period/last-period.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		WeekComponent,
		TableComponent,
		ListComponent,
		CsvComponent,
		NavbarComponent,
		MainComponent,
		ThisPeriodComponent,
		LastPeriodComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		AngularFontAwesomeModule,
		NgbModule,
		Angular2CsvModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
