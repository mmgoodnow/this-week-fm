import { Injectable } from "@angular/core";
import { LastService } from "./last.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { lastFriendsToUsernames } from "../lib/transformations";
import { instanceOfLastFmError } from "../models/LastResponses";
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
		return this.lastService
			.getFriendsRx(username)
			.pipe(map(lastFriendsToUsernames));
	}
}
