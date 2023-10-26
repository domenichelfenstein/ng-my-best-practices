import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    standalone: true,
    selector: "_login-page",
    template: `
        <main>
            Login
            <button (click)="onLoginClick()" type="button">Login</button>
        </main>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    async onLoginClick() {
        this.authService.login();
        await this.router.navigate(["/"]);
    }
}
