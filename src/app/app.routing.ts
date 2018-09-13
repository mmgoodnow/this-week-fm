import { Routes, RouterModule } from "@angular/router";
import { WeekComponent } from "./week/week.component";
import { HomeComponent } from "./home/home.component";
const appRoutes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: "user/:userId",
		component: WeekComponent,
	},
];
export const routing = RouterModule.forRoot(appRoutes);
