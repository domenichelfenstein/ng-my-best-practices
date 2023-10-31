import { ChangeDetectorRef, Directive, effect, inject } from "@angular/core";
import { PatientService } from "../patient.service";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { PatientInfoWidget } from "./patient-info";
import { ProfileWidget } from "./profile";

@Directive({
   selector: "[fromBackend]",
   standalone: true,
   providers: [
      PatientService
   ]
})
export class PatientInfoFromBackend {
   patientInfoWidget = inject(PatientInfoWidget, { optional: true });
   patientProfileWidget = inject(ProfileWidget, { optional: true });

   constructor(
      patientService: PatientService,
      activeRoute: ActivatedRoute,
      changeDetectorRef: ChangeDetectorRef
   ) {
      const params = toSignal(activeRoute.params);
      effect(() => {
         if (this.patientInfoWidget) {
            this.patientInfoWidget.patientInfo = patientService.getContentCurrentPatientId(params, patientService.getPatientInfo)();
         }
         if (this.patientProfileWidget) {
            this.patientProfileWidget.patientInfo = patientService.getContentCurrentPatientId(params, patientService.getPatientInfo)();
         }
         changeDetectorRef.markForCheck();
      })
   }
}
