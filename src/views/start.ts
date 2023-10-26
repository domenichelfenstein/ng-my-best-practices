import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    standalone: true,
    selector: `_start-view`,
    template: `Start`,
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class StartView {
}
