import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PatientInfo } from "../patient.service";
import { Router } from "@angular/router";

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
      private router: Router
   ) {
   }

   async onUpdate() {
      await this.router.navigate(["", "main", { outlets: { "popup": ["update-profile", this.patientId] } }]);
   }
}
