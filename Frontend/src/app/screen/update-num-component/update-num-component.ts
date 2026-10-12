import { Component, OnInit } from '@angular/core';
import { NumberService } from '../../backend/NumberService';
import { Number } from '../../backend/number';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-update-num',
    templateUrl: './update-num-component.html',
    standalone: true,
    imports: [
        FormsModule
    ],
    styleUrls: ['./update-num-component.css']
})
export class UpdateNumComponent implements OnInit {

    id: number;
    number: Number = new Number();
    constructor(private numberService: NumberService,
                private route: ActivatedRoute,
                private router: Router) { }

    updateNumber() {
        this.numberService.updateNumber(this.id, this.number).subscribe(result => this.goToNumList())
    }
    onSubmit(){
        this.updateNumber()
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.numberService.getNumberById(this.id).subscribe(data => {
            this.number = data;
        });
    }

    goToNumList(){
        this.router.navigate(['/showall']);
    }
}