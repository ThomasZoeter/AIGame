import {Component, OnInit, signal} from '@angular/core';
import { Number } from '../../backend/number';
import { NumberService } from '../../backend/NumberService';
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'number-list',
    templateUrl: './numlist-component.html',
    imports: [
        RouterLink
    ],
    standalone: true,
    styleUrls: ['./numlist-component.css']
})
export class NumberListComponent implements OnInit {

    num: Number[] = []

    numbers = signal(this.num);

    constructor(private numberService: NumberService, private router: Router) {
    }

    ngOnInit() {
        this.numberService.findAll().subscribe(data => {
            this.numbers.update(() => data);
            console.log(data)
        });
    }

    goToAddEntity() {
        this.router.navigate(['/add-number'])
    }
}