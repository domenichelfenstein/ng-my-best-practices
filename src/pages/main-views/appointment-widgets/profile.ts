import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PatientInfo } from "../patient.service";
import { MainPage } from "../../main";

@Component({
   standalone: true,
   selector: "profile-widget",
   template: `
      <img [src]="$any(patientInfo?.image)" [alt]="patientInfo?.name"/>
      <h2>{{patientInfo?.name}}</h2>
      <h3>Age: {{patientInfo?.age}}</h3>
      <button type="button" (click)="onUpdate()">Update</button>`,
   styleUrls: ["./profile.scss"],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileWidget {
   @Input("patient-info") patientInfo: PatientInfo | null | undefined;
   @Input("patient-id") patientId: string | null | undefined;

   constructor(
      private mainPage: MainPage,
   ) {
   }

   async onUpdate() {
      await this.mainPage.openPopup(["update-profile", this.patientId]);
   }
}
