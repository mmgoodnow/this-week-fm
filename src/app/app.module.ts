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

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		WeekComponent,
		TableComponent,
		ListComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		AngularFontAwesomeModule,
		NgbModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
