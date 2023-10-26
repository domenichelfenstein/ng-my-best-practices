import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class LoggedInGuard {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    async canActivateBecauseItsLoggedIn() {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        await this.router.navigate(["login"]);
        return false;
    }
}
