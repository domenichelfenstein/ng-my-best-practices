import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MainPage } from "../main";

@Component({
   standalone: true,
   selector: "_update-profile",
   template: `Test
   <a (click)="onClose()">Close</a>`,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProfileComponent {
   constructor(
      private main: MainPage
   ) {
   }

   async onClose() {
      await this.main.closePopup();
   }
}
