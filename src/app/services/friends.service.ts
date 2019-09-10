import { Injectable } from "@angular/core";
import { LastService } from "./last.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { lastFriendsToUsernames } from "../lib/transformations";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class FriendsService {
	constructor(
		private lastService: LastService,
		private http: HttpClient,
		private router: Router
	) {}

	getFriends(username): Observable<any> {
		return this.lastService.getFriendsRx(username).pipe(
			map(lastFriendsToUsernames),
			tap(whatever => console.log(whatever))
		);
	}
}
