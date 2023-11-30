import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
   standalone: true,
   selector: `widget`,
   template: `
       @if (actions) {
           <div class="actions">
               <button type="button" class="toLeft" (click)="toLeft.emit()">
                   <img src="./assets/icons/chevron-left.svg" alt="Move left"/>
               </button>
               <button type="button" class="toRight" (click)="toRight.emit()">
                   <img src="./assets/icons/chevron-right.svg" alt="Move right"/>
               </button>
               <button type="button" class="expand" (click)="expand.emit()">
                   <img src="./assets/icons/expand-alt.svg" alt="Expand"/>
               </button>
               <button type="button" class="shrink" (click)="shrink.emit()">
                   <img src="./assets/icons/compress-alt.svg" alt="Shrink"/>
               </button>
               <button type="button" (click)="close.emit()">
                   <img src="./assets/icons/times.svg" alt="Close"/>
               </button>
           </div>
       }
       <div class="content">
           <ng-content></ng-content>
       </div>`,
   styleUrls: ['./widget.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class Widget {
   @Input() actions = true;
   @Output() toRight = new EventEmitter<void>();
   @Output() toLeft = new EventEmitter<void>();
   @Output() close = new EventEmitter<void>();
   @Output() expand = new EventEmitter<void>();
   @Output() shrink = new EventEmitter<void>();
}
