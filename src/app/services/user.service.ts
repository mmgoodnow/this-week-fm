import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { distinctUntilChanged, tap } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class UserService {
	username: Subject<string> = new Subject<string>();

	constructor() {
		this.subscribe = this.subscribe.bind(this);
	}

	subscribe(func: (username: string) => void): Subscription {
		return this.username
			.pipe(distinctUntilChanged<string>())
			.subscribe(func);
	}

	next(username: string): void {
		if (username) this.username.next(username);
	}
}
