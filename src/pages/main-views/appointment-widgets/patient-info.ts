import { ChangeDetectionStrategy, Component, Input, Pipe, PipeTransform } from "@angular/core";
import { PatientInfo } from "../patient.service";
import { LocalDatePipe } from "../../../common/localDate.pipe";

@Pipe({
   standalone: true,
   name: "join"
})
class JoinPipe implements PipeTransform {
   transform(value: string[] | undefined, separator: string) {
      return value == undefined ? "" : value.join(`${ separator } `);
   }
}

@Pipe({
   standalone: true,
   name: "meter"
})
class MeterPipe implements PipeTransform {
   transform(value: number | undefined) {
      return value == undefined ? "" : `${ value / 100 } m`;
   }
}

@Component({
   standalone: true,
   selector: "patient-info-widget",
   template: `
      <h2>Information:</h2>
      <table>
         <tbody>
         <tr>
            <td>Gender:</td>
            <td>{{ patientInfo?.gender }}</td>
         </tr>
         <tr>
            <td>Blood Type:</td>
            <td>{{ patientInfo?.bloodType }}</td>
         </tr>
         <tr>
            <td>Allergies:</td>
            <td>{{ patientInfo?.allergies | join:',' }}</td>
         </tr>
         <tr>
            <td>Height:</td>
            <td>{{ patientInfo?.height | meter }}</td>
         </tr>
         <tr>
            <td>Weight:</td>
            <td>{{ patientInfo?.weight }} kg</td>
         </tr>
         <tr>
            <td>Last visit:</td>
            <td>{{ patientInfo?.lastVisit | localDate }}</td>
         </tr>
         </tbody>
      </table>`,
   styleUrls: ["./patient-info.scss"],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      JoinPipe,
      MeterPipe,
      LocalDatePipe
   ]
})
export class PatientInfoWidget {
   @Input("patient-info") patientInfo: PatientInfo | null | undefined;
}
