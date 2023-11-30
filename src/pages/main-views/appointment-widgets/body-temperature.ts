import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { VitalSigns } from "../patient.service";

@Component({
   standalone: true,
   selector: "body-temperature-widget",
   template: `
      <img src="./assets/icons/thermometer.svg" alt="thermometer"/>
      <h3>Body Temperature</h3>
      <div>
         <var>{{ vitalSigns?.bodyTemperature }}</var>
         <span>°C</span>
      </div>`,
   styleUrls: ["./vitals.scss"],
   styles: [`
      @import "../../../components";
      @import "../../../colors";

      img {
         @include recolor($warn, 1);
      }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyTemperatureWidget {
   @Input("vital-signs") vitalSigns: VitalSigns | null | undefined;
}
