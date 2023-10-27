import { ChangeDetectionStrategy, Component, computed, Pipe, PipeTransform, Signal } from "@angular/core";
import { PatientInfo, UserInfo, UserInfoService } from "./userInfo.service";
import { AuthService } from "../../auth.service";


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
      return value == undefined ? "" : new Date(value).toLocaleDateString("de-DE");
   }
}

@Pipe({
   standalone: true,
   name: "join"
})
class JoinPipe implements PipeTransform {
   transform(value: string[] | undefined, separator: string) {
      return value == undefined ? "" : value.join(`${separator} `);
   }
}

@Component({
   standalone: true,
   selector: `_dashboard`,
   template: `
      <h1>Current Appointment</h1>
      <div class="dashboard">
         <section class="portrait">
            <img [src]="$any(userInfo()?.image)" [alt]="userInfo()?.name"/>
            <h2>{{userInfo()?.name}}</h2>
            <h3>Age: {{userInfo()?.age}}</h3>
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
         <section class="heart-rate"></section>
         <section class="body-temperature"></section>
         <section class="glucose"></section>
         <section class="test-reports"></section>
         <section class="prescriptions"></section>
      </div>`,
   styleUrls: ['./dashboard.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      MeterPipe,
      LocalDatePipe,
      JoinPipe
   ],
   providers: [
      UserInfoService
   ]
})
export class DashboardView {
   userInfo: Signal<null | UserInfo>;
   patientInfo: Signal<null | PatientInfo>;

   constructor(
      userInfoService: UserInfoService,
      authService: AuthService
   ) {
      this.userInfo = computed(() => {
         const userId = authService.userId();
         if (!userId) {
            return null;
         }

         return userInfoService.getUserInfo(userId)();
      });
      this.patientInfo = computed(() => {
         const userId = authService.userId();
         if (!userId) {
            return null;
         }

         return userInfoService.getPatientInfo(userId)();
      });
   }
}
