import { Route } from "@angular/router";

export const loginRoute: Route =
    {
        path: "login",
        loadComponent: () => import("./login").then(file => file.LoginPage)
    }
