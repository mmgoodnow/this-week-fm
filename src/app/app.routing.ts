import { Routes, RouterModule } from "@angular/router";
import { WeekComponent } from "./week/week.component";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main/main.component";
import { ThisPeriodComponent } from "./this-period/this-period.component";
import { LastPeriodComponent } from "./last-period/last-period.component";
const appRoutes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "user/:userId",
		redirectTo: "user/:userId/this/week",
	},
	{
		path: "user/:userId",
		component: MainComponent,
		children: [
			{
				path: "this/:timeframe",
				component: ThisPeriodComponent,
			},
			{
				path: "last/:timeframe",
				component: LastPeriodComponent,
			},
		],
	},
	{
		path: "**",
		redirectTo: "",
	},
];
export const routing = RouterModule.forRoot(appRoutes);
