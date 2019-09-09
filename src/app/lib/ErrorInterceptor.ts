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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private router: Router) {
		this.handleError = this.handleError.bind(this);
	}

	handleError(error: HttpErrorResponse, caught: Observable<any>) {
		console.log(caught);
		if (
			statusCodeStartsWith(error.status, 4) &&
			instanceOfLastFmError(error.error)
		) {
			// this.router.navigate(["/home"], {
			// 	queryParams: { error: errorCodeToString(error.error) },
			// });
			return caught;
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
