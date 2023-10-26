import { Route } from "@angular/router";

export const dashboardRoute: Route = { path: "dashboard", loadComponent: () => import("./dashboard").then(file => file.DashboardView) };
