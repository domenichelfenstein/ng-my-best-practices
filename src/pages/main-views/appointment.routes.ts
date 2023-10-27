import { Route } from "@angular/router";

export const appointmentRoute: Route = { path: "appointment", loadComponent: () => import("./appointment").then(file => file.AppointmentView) };
