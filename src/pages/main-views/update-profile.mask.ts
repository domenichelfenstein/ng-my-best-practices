import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
   standalone: true,
   selector: "_update-profile",
   template: `Test`,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProfileComponent {}
