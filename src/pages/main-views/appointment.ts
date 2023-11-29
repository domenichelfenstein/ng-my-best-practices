import {
   ChangeDetectionStrategy,
   Component,
   computed,
   Signal
} from "@angular/core";
import { PatientService, VitalSigns } from "./patient.service";
import { ProfileWidget } from "./appointment-widgets/profile";
import { PatientInfoWidget } from "./appointment-widgets/patient-info";
import { PatientInfoFromBackend } from "./appointment-widgets/fromBackend";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { TestReportsWidget } from "./appointment-widgets/test-reports";
import { PrescriptionsWidget } from "./appointment-widgets/prescriptions";
import { AuthService, WidgetDescription } from "../../auth.service";
import { HeartRateWidget } from "./appointment-widgets/heart-rate";
import { BodyTemperatureWidget } from "./appointment-widgets/body-temperature";
import { GlucoseWidget } from "./appointment-widgets/glucose";

@Component({
   standalone: true,
   selector: `_appointment`,
   template: `
       <h1>Current Appointment</h1>
       <div class="dashboard">
           <profile-widget fromBackend class="widget"></profile-widget>
           <patient-info-widget fromBackend class="widget"></patient-info-widget>
           <div class="custom">
               @for (widget of widgets();track $index) {
                   @switch (widget.type) {
                       @case ("heart-rate") {
                           @defer (on viewport) {
                               <heart-rate-widget class="widget {{ widget.size }}"
                                                  [vital-signs]="vitalSigns()"></heart-rate-widget>
                           } @placeholder {
                               <div class="widget placeholder {{ widget.size }}"></div>
                           }
                       }
                       @case ("body-temperature") {
                           @defer (on viewport) {
                               <body-temperature-widget class="widget {{ widget.size }}"
                                                        [vital-signs]="vitalSigns()"></body-temperature-widget>
                           } @placeholder {
                               <div class="widget placeholder {{ widget.size }}"></div>
                           }
                       }
                       @case ("glucose") {
                           @defer (on viewport) {
                               <glucose-widget class="widget {{ widget.size }}" [vital-signs]="vitalSigns()"></glucose-widget>
                           } @placeholder {
                               <div class="widget placeholder {{ widget.size }}"></div>
                           }
                       }
                       @case ("test-report") {
                           @defer (on viewport) {
                               <test-reports-widget class="widget {{ widget.size }}"></test-reports-widget>
                           } @placeholder {
                               <div class="widget placeholder {{ widget.size }}"></div>
                           }
                       }
                       @case ("prescription") {
                           @defer (on viewport) {
                               <prescriptions-widget class="widget {{ widget.size }}"></prescriptions-widget>
                           } @placeholder {
                               <div class="widget placeholder {{ widget.size }}"></div>
                           }
                       }
                   }
               }
           </div>
       </div>`,
   styleUrls: ['./appointment.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      PatientInfoWidget,
      ProfileWidget,
      PatientInfoFromBackend,
      TestReportsWidget,
      PrescriptionsWidget,
      HeartRateWidget,
      BodyTemperatureWidget,
      GlucoseWidget
   ]
})
export class AppointmentView {
   vitalSigns: Signal<VitalSigns | null>;
   widgets: Signal<WidgetDescription[]>;

   constructor(
      patientService: PatientService,
      authService: AuthService,
      activatedRoute: ActivatedRoute
   ) {
      const params = toSignal(activatedRoute.params);
      this.vitalSigns = patientService.getContentCurrentPatientId(params, patientService.getVitalSigns);

      this.widgets = computed(() => {
         const userInfo = authService.userInfo();
         if (userInfo == undefined) {
            return [];
         }

         return userInfo.widgets;
      });
   }
}
