import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./components/app/app.component";
import { LoginComponent } from "./components/login/login.component";
import { routing } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { TableComponent } from "./components/table/table.component";
import { ListComponent } from "./components/list/list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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
import { SortPipe } from "./pipes/sort.pipe";
import { TracksPerDayPipe } from "./pipes/tracks-per-day.pipe";
import { LinksComponent } from "./components/links/links.component";
import { DebugComponent } from "./components/debug/debug.component";
import { TracksPipe } from "./pipes/tracks.pipe";
import { TracksBehindPipe } from "./pipes/tracks-behind.pipe";
import { TrackPipe } from "./pipes/track.pipe";
import { LastTrackPipe } from "./pipes/last-track.pipe";
import { RelativeDatePipe } from "./pipes/relative-date.pipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		TableComponent,
		ListComponent,
		CsvComponent,
		NavbarComponent,
		MainComponent,
		ThisPeriodComponent,
		LastPeriodComponent,
		CustomPeriodComponent,
		SortPipe,
		TracksPerDayPipe,
		LinksComponent,
		LinksComponent,
		DebugComponent,
		TracksPipe,
		TracksBehindPipe,
		TrackPipe,
		LastTrackPipe,
		RelativeDatePipe,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		routing,
		NgbModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
		}),
		FontAwesomeModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		Title,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
