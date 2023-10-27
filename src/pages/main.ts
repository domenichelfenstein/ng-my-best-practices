import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

@Component({
    standalone: true,
    selector: "_main-page",
    template: `
        <nav>
            <div class="title"></div>
            <a [routerLink]="['dashboard']" routerLinkActive="active">
                <img ngSrc="../assets/icons/chess-knight.svg" height="28" alt="chess-knight" width="21"/>
                <span>Dashboard</span>
            </a>
            <a [routerLink]="['users']" routerLinkActive="active">
                <img ngSrc="../assets/icons/users.svg" height="28" alt="users" width="35" priority=""/>
                <span>Users</span>
            </a>
            <a [routerLink]="['health']" routerLinkActive="active">
                <img ngSrc="../assets/icons/heart-beat.svg" height="28" alt="heart" width="28"/>
                <span>Health</span>
            </a>
            <a [routerLink]="['docs']" routerLinkActive="active">
                <img ngSrc="../assets/icons/document-text.svg" height="28" alt="docs" width="21"/>
                <span>Documents</span>
            </a>
            <a [routerLink]="['calendar']" routerLinkActive="active">
                <img ngSrc="../assets/icons/calendar.svg" height="28" alt="calendar" width="25"/>
                <span>Calendar</span>
            </a>
            <a [routerLink]="['archive']" routerLinkActive="active">
                <img ngSrc="../assets/icons/folder.svg" height="28" alt="folder" width="28"/>
                <span>Archive</span>
            </a>
        </nav>
        <header></header>
        <main>
            <router-outlet></router-outlet>
        </main>
        <footer></footer>`,
    styleUrls: ["./main.scss"],
    imports: [
        RouterOutlet,
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {}
