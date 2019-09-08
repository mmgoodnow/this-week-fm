import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./components/app/app.component";
import { HomeComponent } from "./components/home/home.component";
import { routing } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { TableComponent } from "./components/table/table.component";
import { ListComponent } from "./components/list/list.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2CsvModule } from "angular2-csv";
import { CsvComponent } from "./components/csv/csv.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MainComponent } from "./components/main/main.component";
import { ThisPeriodComponent } from "./components/this-period/this-period.component";
import { LastPeriodComponent } from "./components/last-period/last-period.component";
import { CustomPeriodComponent } from "./components/custom-period/custom-period.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorInterceptor } from "./lib/ErrorInterceptor";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		TableComponent,
		ListComponent,
		CsvComponent,
		NavbarComponent,
		MainComponent,
		ThisPeriodComponent,
		LastPeriodComponent,
		CustomPeriodComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		routing,
		AngularFontAwesomeModule,
		NgbModule,
		Angular2CsvModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
		}),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
