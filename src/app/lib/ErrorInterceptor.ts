import { Injectable } from "@angular/core";
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { instanceOfLastFmError } from "../models/LastResponses";
import { errorCodeToString } from "./transformations";
import { statusCodeStartsWith } from "./utils";
import { USER_NOT_FOUND } from "./constants";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private router: Router) {
		this.handleError = this.handleError.bind(this);
	}

	handleError(error: HttpErrorResponse, caught: Observable<any>) {
		console.error(error, caught);

		if (
			statusCodeStartsWith(error.status, 4) &&
			instanceOfLastFmError(error.error) &&
			[6].includes(error.error.error) &&
			[USER_NOT_FOUND].includes(error.error.message)
		) {
			this.router.navigate(["/login"], {
				queryParams: { error: errorCodeToString(error.error) },
			});
		}
		return throwError(error);
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(catchError(this.handleError));
	}
}
