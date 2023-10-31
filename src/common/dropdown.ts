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
   private togglerUnlisten: () => void = () => {
   };
   private documentUnlisten: () => void = () => {
   };

   constructor(
      private changeDetector: ChangeDetectorRef,
      private renderer: Renderer2
   ) {
      this.documentUnlisten = renderer.listen(document, "click", (event: MouseEvent) => {
         if (!this.isOpen) {
            return;
         }

         this.isOpen = false;
         this.changeDetector.markForCheck();
      });
   }

   ngAfterViewInit() {
      this.renderer.setStyle(this.dropdownToggler, "cursor", "pointer");
      this.togglerUnlisten = this.renderer.listen(this.dropdownToggler, "click", () => {
         this.isOpen = !this.isOpen;
         this.changeDetector.markForCheck();
      });
   }

   ngOnDestroy() {
      this.togglerUnlisten();
      this.documentUnlisten();
   }
}
