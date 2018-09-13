import { Routes, RouterModule } from "@angular/router";
import { WeekComponent } from "./week/week.component";
import { HomeComponent } from "./home/home.component";
const appRoutes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "user/:userId",
		component: WeekComponent,
	},
	{
		path: "**",
		redirectTo: "",
	},
];
export const routing = RouterModule.forRoot(appRoutes);
