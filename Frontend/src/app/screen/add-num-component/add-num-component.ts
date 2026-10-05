import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberService } from '../../backend/NumberService';
import { Number } from '../../backend/number';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'add-num-component',
    templateUrl: './add-num-component.html',
    standalone: true,
    imports: [
        FormsModule
    ],
    styleUrls: ['./add-num-component.css']
})
export class AddNumComponent {

    number: Number = new Number();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private numberService: NumberService) {
    }

    saveNumber() {
        this.numberService.save(this.number).subscribe(result => this.gotoUserList())
    }
    onSubmit() {
        console.log("This num after submit: " + this.number)
        this.saveNumber()
    }

    gotoUserList() {
        this.router.navigate(['/showall']);
    }
}