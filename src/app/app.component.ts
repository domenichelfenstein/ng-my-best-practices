import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   selector: 'app-root',
   template: `
      <h1>Test <span class="blubb">Blubb</span></h1>
      <style>
         h1 {
            .blubb {
               color: green;
            }
         }
      </style>
   `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
