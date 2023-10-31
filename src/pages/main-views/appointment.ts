import { ChangeDetectionStrategy, Component, effect, ViewChild, ViewContainerRef } from "@angular/core";
import { PatientService } from "./patient.service";
import { ProfileWidget } from "./appointment-widgets/profile";
import { PatientInfoWidget } from "./appointment-widgets/patient-info";
import { PatientInfoFromBackend } from "./appointment-widgets/fromBackend";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
   standalone: true,
   selector: `_appointment`,
   template: `
      <h1>Current Appointment</h1>
      <div class="dashboard" #dashboard>
         <profile-widget fromBackend></profile-widget>
         <patient-info-widget fromBackend></patient-info-widget>
         <ng-container #placeholder></ng-container>
      </div>`,
   styleUrls: ['./appointment.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      PatientInfoWidget,
      ProfileWidget,
      PatientInfoFromBackend
   ],
   providers: [
      PatientService
   ]
})
export class AppointmentView {
   @ViewChild("placeholder", { read: ViewContainerRef }) dashboard!: ViewContainerRef;

   constructor(
      patientService: PatientService,
      activatedRoute: ActivatedRoute,
   ) {
      const params = toSignal(activatedRoute.params);

      setTimeout(() => {
         import("./appointment-widgets/heart-rate").then(x => {
            const widget = this.dashboard.createComponent(x.HeartRateWidget);
            effect(() => widget.setInput("vital-signs", patientService.getContentCurrentPatientId(params, patientService.getVitalSigns)()), { injector: widget.injector });
         });
         import("./appointment-widgets/body-temperature").then(x => {
            const widget = this.dashboard.createComponent(x.BodyTemperatureWidget);
            effect(() => widget.setInput("vital-signs", patientService.getContentCurrentPatientId(params, patientService.getVitalSigns)()), { injector: widget.injector });
         });
         import("./appointment-widgets/glucose").then(x => {
            const widget = this.dashboard.createComponent(x.GlucoseWidget);
            effect(() => widget.setInput("vital-signs", patientService.getContentCurrentPatientId(params, patientService.getVitalSigns)()), { injector: widget.injector });
         });

         import("./appointment-widgets/test-reports").then(x => this.dashboard.createComponent(x.TestReportsWidget))
         import("./appointment-widgets/prescriptions").then(x => this.dashboard.createComponent(x.PrescriptionsWidget))
      }, 1000);
   }
}
