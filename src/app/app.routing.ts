import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main/main.component";
import { ThisPeriodComponent } from "./this-period/this-period.component";
import { LastPeriodComponent } from "./last-period/last-period.component";
const appRoutes: Routes = [
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: "user/:username",
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
			{
				path: "",
				redirectTo: "this/week",
				pathMatch: "full",
			},
		],
	},
	{
		path: "**",
		redirectTo: "home",
	},
];
export const routing = RouterModule.forRoot(appRoutes);
