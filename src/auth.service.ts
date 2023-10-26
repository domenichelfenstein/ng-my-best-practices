import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthService {
    public isLoggedIn = signal(false);

    public login() {
        this.isLoggedIn.set(true);
    }
}
