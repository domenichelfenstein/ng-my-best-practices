import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, Signal } from "@angular/core";
import { PatientInfo, PatientService, Prescription, TestReport, VitalSigns } from "./patient.service";
import { AppCommonModule } from "../../common/common.module";

@Pipe({
   standalone: true,
   name: "meter"
})
class MeterPipe implements PipeTransform {
   transform(value: number | undefined) {
      return value == undefined ? "" : `${ value / 100 } m`;
   }
}

@Pipe({
   standalone: true,
   name: "localDate"
})
class LocalDatePipe implements PipeTransform {
   transform(value: string | undefined) {
      return value == undefined ? "" : new Date(value)
         .toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
   }
}

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

@Pipe({
   standalone: true,
   name: "join"
})
class JoinPipe implements PipeTransform {
   transform(value: string[] | undefined, separator: string) {
      return value == undefined ? "" : value.join(`${ separator } `);
   }
}

@Component({
   standalone: true,
   selector: `_appointment`,
   template: `
      <h1>Current Appointment</h1>
      <div class="dashboard">
         <section class="portrait">
            <img [src]="$any(patientInfo()?.image)" [alt]="patientInfo()?.name"/>
            <h2>{{patientInfo()?.name}}</h2>
            <h3>Age: {{patientInfo()?.age}}</h3>
            <button type="button">Update</button>
         </section>
         <section class="information">
            <h2>Information:</h2>
            <table>
               <tbody>
               <tr>
                  <td>Gender:</td>
                  <td>{{ patientInfo()?.gender }}</td>
               </tr>
               <tr>
                  <td>Blood Type:</td>
                  <td>{{ patientInfo()?.bloodType }}</td>
               </tr>
               <tr>
                  <td>Allergies:</td>
                  <td>{{ patientInfo()?.allergies | join:',' }}</td>
               </tr>
               <tr>
                  <td>Height:</td>
                  <td>{{ patientInfo()?.height | meter }}</td>
               </tr>
               <tr>
                  <td>Weight:</td>
                  <td>{{ patientInfo()?.weight }} kg</td>
               </tr>
               <tr>
                  <td>Last visit:</td>
                  <td>{{ patientInfo()?.lastVisit | localDate }}</td>
               </tr>
               </tbody>
            </table>
         </section>
         <section class="heart-rate vital">
            <img src="../../assets/icons/heart-rate.svg" alt="heart rate"/>
            <h3>Heart Rate</h3>
            <div>
               <var>{{ vitalSigns()?.heartRate }}</var>
               <span>bpm</span>
            </div>
         </section>
         <section class="body-temperature vital">
            <img src="../../assets/icons/thermometer.svg" alt="thermometer"/>
            <h3>Body Temperature</h3>
            <div>
               <var>{{ vitalSigns()?.bodyTemperature }}</var>
               <span>°C</span>
            </div>
         </section>
         <section class="glucose vital">
            <img src="../../assets/icons/vial.svg" alt="vial"/>
            <h3>Glucose</h3>
            <div>
               <var>{{ vitalSigns()?.glucoseLevel }}</var>
               <span>mg/dl</span>
            </div>
         </section>
         <section class="test-reports">
            <h3>Test Reports</h3>
            <ul>
               <li *ngFor="let t of testReports()">
                  <h4>{{ t.label }}</h4>
                  <small>{{ t.date | localDate }}</small>
                  <div class="icon-wrapper" [ngClass]="t.resultType">
                     <img src="../../assets/icons/notes-medical.svg" alt="{{ t.resultType }}"/>
                  </div>
               </li>
            </ul>
         </section>
         <section class="prescriptions">
            <h3>Prescriptions</h3>
            <a class="drop-zone">
               <img src="../../assets/icons/plus.svg" alt="plus"/>
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
               <tr *ngFor="let p of prescriptions()">
                  <td>
                     <div class="icon-wrapper" [ngClass]="p.type">
                        <img src="../../assets/icons/notes-medical.svg" alt="{{ p.type }}"/>
                     </div>
                     <span>{{ p.label }}</span>
                  </td>
                  <td>{{ p.date | localDate }}</td>
                  <td>{{ [p.durationAmount, p.durationUnit] | duration }}</td>
               </tr>
               </tbody>
            </table>
         </section>
      </div>`,
   styleUrls: ['./appointment.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      MeterPipe,
      LocalDatePipe,
      DurationPipe,
      JoinPipe,
      AppCommonModule
   ],
   providers: [
      PatientService
   ]
})
export class AppointmentView {
   patientInfo: Signal<null | PatientInfo>;
   vitalSigns: Signal<null | VitalSigns>;
   testReports: Signal<null | TestReport[]>;
   prescriptions: Signal<null | Prescription[]>;

   constructor(
      patientService: PatientService
   ) {
      this.patientInfo = patientService.getContentCurrentUserId(patientService.getPatientInfo);
      this.vitalSigns = patientService.getContentCurrentUserId(patientService.getVitalSigns);
      this.testReports = patientService.getContentCurrentUserId(patientService.getTestReports);
      this.prescriptions = patientService.getContentCurrentUserId(patientService.getPrescriptions);
   }
}
