import {Component, OnInit, signal} from '@angular/core';
import { Number } from '../../backend/number';
import { NumberService } from '../../backend/NumberService';

@Component({
    selector: 'number-list',
    templateUrl: './numlist-component.html',
    standalone: true,
    styleUrls: ['./numlist-component.css']
})
export class NumberListComponent implements OnInit {

    num: Number[] = []

    numbers = signal(this.num);

    constructor(private numberService: NumberService) {
        console.log(this.numbers)
    }

    ngOnInit() {
        console.log("1")
        this.numberService.findAll().subscribe(data => {
            this.numbers.update(() => data);
            console.log(data)
        });
        // this.numbers = [{id: "1", number: "DFT"}]
        console.log("2")
    }
}