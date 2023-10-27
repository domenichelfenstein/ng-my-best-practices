import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    standalone: true,
    selector: `_dashboard`,
    template: `
    <h1>Current Appointment</h1>
    <div class="dashboard">
       <section class="portrait"></section>
       <section class="information"></section>
       <section class="heart-rate"></section>
       <section class="body-temperature"></section>
       <section class="glucose"></section>
       <section class="test-reports"></section>
       <section class="prescriptions"></section>
    </div>`,
   styleUrls: ['./dashboard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DashboardView {
}
