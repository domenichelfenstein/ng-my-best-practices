import { Route } from "@angular/router";
import { dashboardRoute } from "./main-views/dashboard.routes";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";

export const mainRoute: Route =
    {
        path: "main",
        loadComponent: () => import("./main").then(file => file.MainPage),
        canActivate: [() => inject(AuthService).canActivateBecauseItsLoggedIn()],
        children: [
            dashboardRoute,
            {path: "", redirectTo: "dashboard", pathMatch: "full"}
        ]
    }
