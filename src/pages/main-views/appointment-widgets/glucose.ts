import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { VitalSigns } from "../patient.service";

@Component({
   standalone: true,
   selector: "glucose-widget",
   template: `
      <img src="./assets/icons/vial.svg" alt="vial"/>
      <h3>Glucose</h3>
      <div>
         <var>{{ vitalSigns?.glucoseLevel }}</var>
         <span>mg/dl</span>
      </div>`,
   styleUrls: ["./vitals.scss"],
   styles: [`
      @import "../../../components";
      @import "../../../colors";

      img {
         @include recolor($danger, 1);
      }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlucoseWidget {
   @Input("vital-signs") vitalSigns: VitalSigns | null | undefined;
}
