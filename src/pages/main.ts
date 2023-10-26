import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    selector: "_main-page",
    template: `
        <header></header>
        <nav></nav>
        <main>
            Main
            <router-outlet></router-outlet>
        </main>
        <footer></footer>`,
    imports: [
        RouterOutlet
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {}
