import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { ThisPeriodComponent } from "./components/this-period/this-period.component";
import { LastPeriodComponent } from "./components/last-period/last-period.component";
import { CustomPeriodComponent } from "./components/custom-period/custom-period.component";
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
				path: "custom",
				component: CustomPeriodComponent,
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
