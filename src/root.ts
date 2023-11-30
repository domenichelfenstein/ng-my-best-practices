import { bootstrapApplication } from "@angular/platform-browser";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterOutlet, Routes } from "@angular/router";
import { mainRoute } from "./pages/main.route";
import { loginRoute } from "./pages/login.route";
import { APP_BASE_HREF, PlatformLocation } from "@angular/common";

function trimLastSlashFromUrl(baseUrl: string) {
   if (baseUrl == undefined || baseUrl === "") {
      return "/";
   } else if (baseUrl[baseUrl.length - 1] == '/') {
      var trimmedUrl = baseUrl.substring(0, baseUrl.length - 1);
      return trimmedUrl;
   }
   return baseUrl;
}

@Component({
   standalone: true,
   selector: 'app-root',
   template: `
      <router-outlet></router-outlet>
   `,
   styleUrls: ['./root.scss'],
   imports: [
      RouterOutlet
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
class AppRoot {
}

const routes: Routes = [
   mainRoute,
   loginRoute,
   { path: "", redirectTo: "main/appointment", pathMatch: "full" },
];

bootstrapApplication(
   AppRoot,
   {
      providers: [
         provideRouter(routes),
         {
            provide: APP_BASE_HREF,
            useFactory: (s: PlatformLocation) => trimLastSlashFromUrl(s.getBaseHrefFromDOM()),
            deps: [PlatformLocation]
         }
      ]
   }).catch(console.error);
