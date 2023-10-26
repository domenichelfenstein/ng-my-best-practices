import { Route } from "@angular/router";
import { dashboardRoute } from "./main-views/dashboard.routes";
import { LoggedInGuard } from "../loggedIn.guard";
import { inject } from "@angular/core";

export const mainRoute: Route =
    {
        path: "main",
        loadComponent: () => import("./main").then(file => file.MainPage),
        canActivate: [() => inject(LoggedInGuard).canActivateBecauseItsLoggedIn()],
        children: [
            dashboardRoute,
            {path: "", redirectTo: "dashboard", pathMatch: "full"}
        ]
    }
