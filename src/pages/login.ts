import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { AppCommonModule } from "../common/common.module";

@Component({
   standalone: true,
   selector: "_login-page",
   template: `
      <form autocomplete="off" (submit)="onLoginClick()">
         <h1>Login</h1>
         <section>
            <label>Username</label>
            <input type="text" placeholder="Username" [(ngModel)]="username" name="username" autofocus>
         </section>
         <section>
            <label>Password</label>
            <input type="password" placeholder="Password" [(ngModel)]="password" name="password">
         </section>
         <button type="submit">Login</button>
      </form>`,
   styleUrls: ["./login.scss"],
   imports: [
      AppCommonModule
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
   username = "";
   password = "";

   constructor(
      private router: Router,
      private authService: AuthService
   ) {
   }

   async onLoginClick() {
      const success = await this.authService.login(this.username, this.password);

      if (success) {
         await this.router.navigate(["/"]);
      }
   }
}
