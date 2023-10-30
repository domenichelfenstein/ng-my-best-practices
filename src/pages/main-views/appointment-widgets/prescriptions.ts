import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   Directive,
   effect,
   Input,
   Pipe,
   PipeTransform
} from "@angular/core";
import { PatientService, Prescription } from "../patient.service";
import { LocalDatePipe } from "../../../common/localDate.pipe";
import { NgClass, NgForOf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";

@Pipe({
   standalone: true,
   name: "duration"
})
class DurationPipe implements PipeTransform {
   transform(value: [number, string] | undefined) {
      if (value == undefined) {
         return "";
      }

      const [amount, unit] = value;
      return `${ amount } ${ unit }s`;
   }
}

@Directive({
   selector: "prescriptions-widget[fromBackend]",
   standalone: true,
   providers: [
      PatientService
   ]
})
export class PrescriptionsFromBackend {
   constructor(
      host: PrescriptionsWidget,
      patientService: PatientService,
      activeRoute: ActivatedRoute,
      changeDetectorRef: ChangeDetectorRef
   ) {
      const params = toSignal(activeRoute.params);
      effect(() => {
         host.prescriptions = patientService.getContentCurrentPatientId(params, patientService.getPrescriptions)();
         changeDetectorRef.markForCheck();
      })
   }
}

@Component({
   standalone: true,
   selector: "prescriptions-widget",
   template: `
      <h3>Prescriptions</h3>
      <a class="drop-zone">
         <img src="../../../assets/icons/plus.svg" alt="plus"/>
         <label>Add a prescription</label>
      </a>
      <table>
         <thead>
         <tr>
            <td>Prescriptions</td>
            <td>Date</td>
            <td>Duration</td>
         </tr>
         </thead>
         <tbody>
         <tr *ngFor="let p of prescriptions">
            <td>
               <div class="icon-wrapper" [ngClass]="p.type">
                  <img src="../../../assets/icons/notes-medical.svg" alt="{{ p.type }}"/>
               </div>
               <span>{{ p.label }}</span>
            </td>
            <td>{{ p.date | localDate }}</td>
            <td>{{ [p.durationAmount, p.durationUnit] | duration }}</td>
         </tr>
         </tbody>
      </table>`,
   styleUrls: ["./prescriptions.scss"],
   imports: [
      LocalDatePipe,
      NgForOf,
      NgClass,
      DurationPipe
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
   hostDirectives: [
      PrescriptionsFromBackend]
})
export class PrescriptionsWidget {
   @Input() prescriptions: Prescription[] | null | undefined;
}
