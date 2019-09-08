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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	_router: Router;
	constructor(private router: Router) {
		this._router = this.router;
		this.handleError = this.handleError.bind(this);
	}

	handleError(error: HttpErrorResponse) {
		console.log(error.error);
		if (error.error instanceof ErrorEvent) {
			console.error("An error occurred:", error.error.message);
		} else if (instanceOfLastFmError(error.error)) {
			this.router.navigate(["/home"], {
				queryParams: { message: errorCodeToString(error.error) },
			});
			return;
		}
		// return an observable with a user-facing error message
		return throwError(error.error);
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(catchError(this.handleError));
	}
}
