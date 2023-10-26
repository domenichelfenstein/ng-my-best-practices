import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(
        private router: Router
    ) {
    }

    public isLoggedIn = signal(true);

    public login() {
        this.isLoggedIn.set(true);
    }

    async canActivateBecauseItsLoggedIn() {
        if (this.isLoggedIn()) {
            return true;
        }

        await this.router.navigate(["login"]);
        return false;
    }
}
