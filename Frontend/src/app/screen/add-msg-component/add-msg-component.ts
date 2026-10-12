import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../backend/MessageService';
import { Message } from '../../backend/Message';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'add-num-component',
    templateUrl: './add-msg-component.html',
    standalone: true,
    imports: [
        FormsModule
    ],
    styleUrls: ['./add-msg-component.css']
})
export class AddMsgComponent {

    Message: Message = new Message();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private MessageService: MessageService) {
    }

    saveMessage() {
        this.MessageService.save(this.Message).subscribe(result => this.goToMessagerList())
    }
    onSubmit() {
        this.saveMessage()
    }

    goToMessagerList() {
        this.router.navigate(['/showall']);
    }
}