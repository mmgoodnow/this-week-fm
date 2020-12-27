import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { ThisPeriodComponent } from "./components/this-period/this-period.component";
import { LastPeriodComponent } from "./components/last-period/last-period.component";
import { CustomPeriodComponent } from "./components/custom-period/custom-period.component";
import { DebugComponent } from "./components/debug/debug.component";

const appRoutes: Routes = [
	{
		path: "login",
		component: LoginComponent,
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
		path: "debug",
		component: DebugComponent,
	},
	{
		path: "**",
		redirectTo: "login",
	},
];
export const routing = RouterModule.forRoot(appRoutes);
