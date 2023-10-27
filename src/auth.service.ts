import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { SignalService } from "./common/signals.service";
import { FetchService } from "./common/fetch.service";

@Injectable({ providedIn: "root" })
export class AuthService extends SignalService {
   constructor(
      private router: Router,
      fetchService: FetchService
   ) {
      super(fetchService);
   }

   public isLoggedIn = signal(false);

   public async login(username: string, password: string) {
      try {
         await this.fetchService.post("login", { username, password });
         this.isLoggedIn.set(true);
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
}
