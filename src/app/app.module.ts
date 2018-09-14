import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { WeekComponent } from "./week/week.component";
import { routing } from "./app.routing";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [AppComponent, HomeComponent, WeekComponent],
	imports: [BrowserModule, FormsModule, routing],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
