import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { VitalSigns } from "../patient.service";

@Component({
   standalone: true,
   selector: "heart-rate-widget",
   template: `
      <img src="../../../assets/icons/heart-rate.svg" alt="heart rate"/>
      <h3>Heart Rate</h3>
      <div>
         <var>{{ vitalSigns?.heartRate }}</var>
         <span>bpm</span>
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
export class HeartRateWidget {
   @Input("vital-signs") vitalSigns: VitalSigns | null | undefined;
}
