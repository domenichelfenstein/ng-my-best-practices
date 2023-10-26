import { bootstrapApplication } from "@angular/platform-browser";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterOutlet, Routes } from "@angular/router";
import { mainRoute } from "./pages/main.route";
import { loginRoute } from "./pages/login.route";

@Component({
    standalone: true,
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./root.scss'],
    imports: [
        RouterOutlet
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class AppRoot {
}

const routes: Routes = [
    mainRoute,
    loginRoute,
    {path: "", redirectTo: "main", pathMatch: "full"}
];

bootstrapApplication(
    AppRoot,
    {
        providers: [
            provideRouter(routes)
        ]
    }).catch(console.error);
