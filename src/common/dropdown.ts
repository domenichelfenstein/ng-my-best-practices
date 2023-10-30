import {
   AfterViewInit,
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   HostBinding,
   Input,
   OnDestroy,
   Renderer2
} from "@angular/core";

@Component({
   selector: "[dropdown-on]",
   template: "<ng-content></ng-content>",
   styleUrls: ["./dropdown.scss"],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class Dropdown implements AfterViewInit, OnDestroy {
   @Input("dropdown-on") dropdownToggler: HTMLElement | undefined;
   @HostBinding("class.open") isOpen = false;
   private unlisten: () => void = () => {
   };

   constructor(
      private changeDetector: ChangeDetectorRef,
      private renderer: Renderer2
   ) {
   }

   ngAfterViewInit() {
      this.unlisten = this.renderer.listen(this.dropdownToggler, "click", () => {
         this.isOpen = !this.isOpen;
         this.changeDetector.markForCheck();
      });
   }

   ngOnDestroy() {
      this.unlisten();
   }
}
