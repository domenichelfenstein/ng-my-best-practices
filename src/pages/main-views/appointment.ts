import { ChangeDetectionStrategy, Component, computed, effect, signal, Signal } from "@angular/core";
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
import { Widget } from "./widget";

@Component({
   standalone: true,
   selector: `_appointment`,
   template: `
       <h1>Current Appointment</h1>
       <div class="dashboard">
           <widget [actions]="false">
               <profile-widget fromBackend></profile-widget>
           </widget>
           <widget [actions]="false">
               <patient-info-widget fromBackend></patient-info-widget>
           </widget>
           <div class="custom">
               @for (widget of widgets();track $index) {
                   <widget class="{{ widget.size }}"
                           (close)="removeWidget($index)" (toLeft)="moveLeft($index)" (toRight)="moveRight($index)"
                            (expand)="expand($index)" (shrink)="shrink($index)">
                       @switch (widget.type) {
                           @case ("heart-rate") {
                               @defer (on viewport) {
                                   <heart-rate-widget [vital-signs]="vitalSigns()"></heart-rate-widget>
                               } @placeholder {
                                   <div class="placeholder"></div>
                               }
                           }
                           @case ("body-temperature") {
                               @defer (on viewport) {
                                   <body-temperature-widget [vital-signs]="vitalSigns()"></body-temperature-widget>
                               } @placeholder {
                                   <div class="placeholder"></div>
                               }
                           }
                           @case ("glucose") {
                               @defer (on viewport) {
                                   <glucose-widget [vital-signs]="vitalSigns()"></glucose-widget>
                               } @placeholder {
                                   <div class="placeholder"></div>
                               }
                           }
                           @case ("test-report") {
                               @defer (on viewport) {
                                   <test-reports-widget></test-reports-widget>
                               } @placeholder {
                                   <div class="placeholder"></div>
                               }
                           }
                           @case ("prescription") {
                               @defer (on viewport) {
                                   <prescriptions-widget></prescriptions-widget>
                               } @placeholder {
                                   <div class="placeholder"></div>
                               }
                           }
                       }
                   </widget>
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
      GlucoseWidget,
      Widget
   ]
})
export class AppointmentView {
   vitalSigns: Signal<VitalSigns | null>;
   widgets = signal<WidgetDescription[]>([]);

   constructor(
      patientService: PatientService,
      authService: AuthService,
      activatedRoute: ActivatedRoute
   ) {
      const params = toSignal(activatedRoute.params);
      this.vitalSigns = patientService.getContentCurrentPatientId(params, patientService.getVitalSigns);

      const widgetsFromBackend = computed(() => {
         const userInfo = authService.userInfo();
         if (userInfo == undefined) {
            return [];
         }

         return userInfo.widgets;
      });

      effect(() => {
         this.widgets.set(widgetsFromBackend());
      }, { allowSignalWrites: true });
   }

   removeWidget(index: number) {
      this.widgets.update(widgets => {
         widgets.splice(index, 1);
         return widgets;
      });
   }

   moveLeft(index: number) {
      this.widgets.update(widgets => {
         const widget = widgets[index];
         widgets.splice(index, 1);
         widgets.splice(index - 1, 0, widget);
         return widgets;
      });
   }

   moveRight(index: number) {
      this.widgets.update(widgets => {
         const widget = widgets[index];
         widgets.splice(index, 1);
         widgets.splice(index + 1, 0, widget);
         return widgets;
      });
   }

   expand(index: number) {
      this.widgets.update(widgets => {
         const widget = widgets[index];
         widget.size = "wide"
         return widgets;
      });
   }

   shrink(index: number) {
      this.widgets.update(widgets => {
         const widget = widgets[index];
         widget.size = "small"
         return widgets;
      });
   }
}
