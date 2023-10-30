import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PatientInfo } from "../patient.service";

@Component({
   standalone: true,
   selector: "profile-widget",
   template: `
      <img [src]="$any(patientInfo?.image)" [alt]="patientInfo?.name"/>
      <h2>{{patientInfo?.name}}</h2>
      <h3>Age: {{patientInfo?.age}}</h3>
      <button type="button">Update</button>`,
   styleUrls: ["./profile.scss"],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileWidget {
   @Input("patient-info") patientInfo: PatientInfo | null | undefined;
}
