import { Routes } from "@angular/router";

export const appointmentRoutes: Routes = [
   { path: "appointment/:patientId", loadComponent: () => import("./appointment").then(file => file.AppointmentView) },
   { path: "appointment", redirectTo: "appointment/8949a3f3-4940-422c-8ebd-49695a3a4402", pathMatch: "full" },
   { path: "update-profile/:patientId", loadComponent: () => import("./update-profile.mask").then(file => file.UpdateProfileComponent), outlet: "popup" },
];
