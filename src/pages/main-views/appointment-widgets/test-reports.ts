import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, effect, Input } from "@angular/core";
import { PatientService, TestReport } from "../patient.service";
import { LocalDatePipe } from "../../../common/localDate.pipe";
import { NgClass } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";

@Directive({
   selector: "test-reports-widget[fromBackend]",
   standalone: true
})
export class TestReportsFromBackend {
   constructor(
      host: TestReportsWidget,
      patientService: PatientService,
      activeRoute: ActivatedRoute,
      changeDetectorRef: ChangeDetectorRef
   ) {
      const params = toSignal(activeRoute.params);
      effect(() => {
         const testReports = patientService.getContentCurrentPatientId(params, patientService.getTestReports);
         host.reports = testReports();
         changeDetectorRef.markForCheck();
      })
   }
}

@Component({
   standalone: true,
   selector: "test-reports-widget",
   template: `
      <h3>Test Reports</h3>
      <ul>
         @for (t of reports; track t) {
            <li>
                      <h4>{{ t.label }}</h4>
               <small>{{ t.date | localDate }}</small>
               <div class="icon-wrapper" [ngClass]="t.resultType">
                  <img src="./assets/icons/notes-medical.svg" alt="{{ t.resultType }}"/>
               </div>
            </li>
         }
      </ul>`,
   styleUrls: ["./test-reports.scss"],
   imports: [
      LocalDatePipe,
      NgClass
   ],
   hostDirectives: [
      TestReportsFromBackend],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestReportsWidget {
   @Input() reports: TestReport[] | null | undefined;
}
