import {
   AfterViewInit,
   ChangeDetectionStrategy,
   Component,
   computed,
   effect,
   Injector,
   Signal,
   ViewChild,
   ViewContainerRef
} from "@angular/core";
import { PatientService } from "./patient.service";
import { ProfileWidget } from "./appointment-widgets/profile";
import { PatientInfoWidget } from "./appointment-widgets/patient-info";
import { PatientInfoFromBackend } from "./appointment-widgets/fromBackend";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { TestReportsWidget } from "./appointment-widgets/test-reports";
import { PrescriptionsWidget } from "./appointment-widgets/prescriptions";
import { AuthService } from "../../auth.service";

@Component({
   standalone: true,
   selector: `_appointment`,
   template: `
       <h1>Current Appointment</h1>
       <div class="dashboard" #dashboard>
           <profile-widget fromBackend></profile-widget>
           <patient-info-widget fromBackend></patient-info-widget>
           <ng-container #placeholder></ng-container>
           @for (widget of widgets();track $index) {
               @switch (widget) {
                   @case ("test-report") {
                       @defer (on viewport) {
                           <test-reports-widget></test-reports-widget>
                       } @placeholder {
                           <div class="viewportTrigger"></div>
                       }
                   }
                   @case ("prescription") {
                       @defer (on viewport) {
                           <prescriptions-widget></prescriptions-widget>
                       } @placeholder {
                           <div class="viewportTrigger"></div>
                       }
                   }
               }
               <ng-container #placeholder></ng-container>
           }
       </div>`,
   styleUrls: ['./appointment.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      PatientInfoWidget,
      ProfileWidget,
      PatientInfoFromBackend,
      TestReportsWidget,
      PrescriptionsWidget
   ]
})
export class AppointmentView implements AfterViewInit {
   @ViewChild("placeholder", { read: ViewContainerRef }) dashboard!: ViewContainerRef;

   widgets: Signal<string[]>;

   // @ViewChild("t", { read: ViewContainerRef }) viewportTrigger!: ViewContainerRef;
   // // can be used instead of `@defer(on viewport(t))`
   // triggerReached = signal(false);

   constructor(
      patientService: PatientService,
      authService: AuthService,
      activatedRoute: ActivatedRoute,
      injector: Injector
   ) {
      const params = toSignal(activatedRoute.params);

      // old way
      setTimeout(() => {
         import("./appointment-widgets/heart-rate").then(x => {
            const widget = this.dashboard.createComponent(x.HeartRateWidget);
            const vitalSignsSignal = patientService.getContentCurrentPatientId(params, patientService.getVitalSigns);
            effect(() => widget.setInput("vital-signs", vitalSignsSignal()), { injector });
         });
         import("./appointment-widgets/body-temperature").then(x => {
            const widget = this.dashboard.createComponent(x.BodyTemperatureWidget);
            const vitalSignsSignal = patientService.getContentCurrentPatientId(params, patientService.getVitalSigns);
            effect(() => widget.setInput("vital-signs", vitalSignsSignal()), { injector });
         });
         import("./appointment-widgets/glucose").then(x => {
            const widget = this.dashboard.createComponent(x.GlucoseWidget);
            const vitalSignsSignal = patientService.getContentCurrentPatientId(params, patientService.getVitalSigns);
            effect(() => widget.setInput("vital-signs", vitalSignsSignal()), { injector });
         });
      }, 1000);

      this.widgets = computed(() => {
         const userInfo = authService.userInfo();
         if (userInfo == undefined) {
            return [];
         }

         return userInfo.widgets;
      });
   }

   ngAfterViewInit(): void {
      // const observer = new IntersectionObserver(
      //    entries => {
      //       if (entries[0].isIntersecting) {
      //          this.triggerReached.set(true);
      //       }
      //    }, {
      //       root: null,
      //       threshold: 1.0
      //    });
      // observer.observe(this.viewportTrigger.element.nativeElement);
   }
}
