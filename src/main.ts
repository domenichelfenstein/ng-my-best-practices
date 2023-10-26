import { bootstrapApplication } from "@angular/platform-browser";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterOutlet, Routes } from "@angular/router";
import { startRoute } from "./views/start.routes";

@Component({
    standalone: true,
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
        <style>
        </style>
    `,
    imports: [
        RouterOutlet
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class AppRoot {
}

const routes: Routes = [
    startRoute,
    {path: "", redirectTo: "start", pathMatch: "full"}
];

bootstrapApplication(
    AppRoot,
    {
        providers: [
            provideRouter(routes)
        ]
    }).catch(console.error);
