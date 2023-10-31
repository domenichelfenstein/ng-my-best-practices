import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { AuthService } from "../auth.service";
import { Dropdown } from "../common/dropdown";

@Component({
   standalone: true,
   selector: "_main-page",
   template: `
       <nav>
           <div class="title"></div>
           <a [routerLink]="['appointment']" routerLinkActive="active">
               <img ngSrc="../assets/icons/stetoscope.svg" height="28" alt="stetoscrope" width="28"/>
               <span>Appointment</span>
           </a>
           <a [routerLink]="['users']" routerLinkActive="active">
               <img ngSrc="../assets/icons/users.svg" height="28" alt="users" width="35" priority=""/>
               <span>Users</span>
           </a>
           <a [routerLink]="['health']" routerLinkActive="active">
               <img ngSrc="../assets/icons/heart-beat.svg" height="28" alt="heart" width="28"/>
               <span>Health</span>
           </a>
           <a [routerLink]="['docs']" routerLinkActive="active">
               <img ngSrc="../assets/icons/document-text.svg" height="28" alt="docs" width="21"/>
               <span>Documents</span>
           </a>
           <a [routerLink]="['calendar']" routerLinkActive="active">
               <img ngSrc="../assets/icons/calendar.svg" height="28" alt="calendar" width="25"/>
               <span>Calendar</span>
           </a>
           <a [routerLink]="['archive']" routerLinkActive="active">
               <img ngSrc="../assets/icons/folder.svg" height="28" alt="folder" width="28"/>
               <span>Archive</span>
           </a>
       </nav>
       <header>
           <section class="user-info">
               <img [src]="authService.userInfo()?.image" [alt]="authService.userInfo()?.name"/>
               <a #toggler>
                   <span>{{ authService.userInfo()?.name }}</span>
                   <img src="../assets/icons/chevron-down.svg" alt="chevron-down"/>
               </a>
               <ul [dropdown-on]="toggler" class="right">
                   <li><a>Profile</a></li>
                   <li><a>Logout</a></li>
               </ul>
           </section>
       </header>
       <main>
           <router-outlet></router-outlet>
       </main>
       <footer></footer>
       <div class="overlay" (click)="closePopup($event, overlay)" #overlay>
          <router-outlet name="popup" (activate)="isActivated = true"
                         (deactivate)="isActivated = false"></router-outlet>
       </div>`,
   styleUrls: ["./main.scss"],
   imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      NgOptimizedImage,
      Dropdown
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {
   @HostBinding("class.active-popup") isActivated = false;

   constructor(
      public authService: AuthService,
      private router: Router
   ) {
   }

   async closePopup($event: MouseEvent, overlay: HTMLElement) {
      if ($event.target !== overlay) {
         return;
      }
      await this.router.navigate(["", "main", { outlets: { popup: null } }]);
   }
}
