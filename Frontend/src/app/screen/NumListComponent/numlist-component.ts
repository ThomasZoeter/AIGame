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
        this.getNumbers();
    }

    private getNumbers(){
        this.numberService.findAll().subscribe(data => {
            this.numbers.update(() => data);
        });
    }

    goToAddEntity() {
        this.router.navigate(['/add-number'])
    }

    deleteNumber(id: number) {
        this.numberService.deleteNumber(id).subscribe(data => {
            this.getNumbers();
        })
    }

    updateNumber(id: number) {
        this.router.navigate(['update-number', id])
    }
}