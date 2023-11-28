import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { SignalService } from "./common/signals.service";

@Injectable({ providedIn: "root" })
export class AuthService extends SignalService {
   constructor(
      private router: Router
   ) {
      super();
      this.isLoggedIn.set(true);
      this.login("test", "test");
   }

   public isLoggedIn = signal(false);
   public userInfo = signal<UserInfo | undefined>(undefined);

   public async login(username: string, password: string) {
      try {
         const result = await this.fetchService.post<any, UserInfo>("login", { username, password });
         this.isLoggedIn.set(true);
         this.userInfo.set(result);
         return true;
      } catch (error) {
         console.warn("Login", error);
         this.isLoggedIn.set(false);
         return false;
      }
   }

   async canActivateBecauseItsLoggedIn() {
      if (this.isLoggedIn()) {
         return true;
      }

      await this.router.navigate(["login"]);
      return false;
   }

   async logout() {
      this.userInfo.set(undefined);
      this.isLoggedIn.set(false);
      await this.router.navigate(["login"]);
   }
}

export type UserInfo = { userId: string; name: string; image: string; widgets: string[] };
