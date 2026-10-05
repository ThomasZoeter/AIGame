import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {inject} from "vitest";

@Component({
    selector: 'screen-view',
    imports: [
        RouterLink
    ],
    templateUrl: './screen-view.html',
    styleUrls: ['./screen-view.css'],

    standalone: true
})
export class ScreenView {
    title: String;

    constructor(private router: Router,) {
        this.title = "JOHO"
    }

    public navigateToNumbers() {
        this.router.navigate(['/numbers'])
    }
}
