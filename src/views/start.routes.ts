import { Route } from "@angular/router";

export const startRoute: Route = { path: "start", loadComponent: () => import("./start").then(file => file.StartView) };
