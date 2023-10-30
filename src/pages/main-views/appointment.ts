import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PatientService } from "./patient.service";
import { ProfileWidget } from "./appointment-widgets/profile";
import { PatientInfoWidget } from "./appointment-widgets/patient-info";
import { HeartRateWidget } from "./appointment-widgets/heart-rate";
import { BodyTemperatureWidget } from "./appointment-widgets/body-temperature";
import { GlucoseWidget } from "./appointment-widgets/glucose";
import { TestReportsWidget } from "./appointment-widgets/test-reports";
import { PrescriptionsWidget } from "./appointment-widgets/prescriptions";
import { PatientInfoFromBackend, VitalsFromBackend } from "./appointment-widgets/fromBackend";

@Component({
   standalone: true,
   selector: `_appointment`,
   template: `
      <h1>Current Appointment</h1>
      <div class="dashboard">
         <profile-widget fromBackend></profile-widget>
         <patient-info-widget fromBackend></patient-info-widget>
         <heart-rate-widget fromBackend></heart-rate-widget>
         <body-temperature-widget fromBackend></body-temperature-widget>
         <glucose-widget fromBackend></glucose-widget>
         <test-reports-widget></test-reports-widget>
         <prescriptions-widget></prescriptions-widget>
      </div>`,
   styleUrls: ['./appointment.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      PatientInfoWidget,
      ProfileWidget,
      HeartRateWidget,
      BodyTemperatureWidget,
      GlucoseWidget,
      TestReportsWidget,
      PrescriptionsWidget,
      VitalsFromBackend,
      PatientInfoFromBackend
   ],
   providers: [
      PatientService
   ]
})
export class AppointmentView {
}
