import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    standalone: true,
    selector: `_dashboard`,
    template: `Dashboard`,
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DashboardView {
}
