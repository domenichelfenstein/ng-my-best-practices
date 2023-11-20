import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MainPage } from "../main";
import { PatientService } from "./patient.service";

@Component({
   standalone: true,
   selector: "_update-profile",
   template: `
       <a (click)="reload()">Test</a>
       <a (click)="onClose()">Close</a>`,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProfileComponent {
   constructor(
      private main: MainPage,
      private patientService: PatientService
   ) {
   }

   async onClose() {
      await this.main.closePopup();
   }

   reload() {
      this.patientService.contentChanged();
   }
}
