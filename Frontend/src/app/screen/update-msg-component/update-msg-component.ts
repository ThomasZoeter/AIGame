import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../backend/MessageService';
import { Message } from '../../backend/Message';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-update-num',
    templateUrl: './update-msg-component.html',
    standalone: true,
    imports: [
        FormsModule
    ],
    styleUrls: ['./update-msg-component.css']
})
export class UpdateMsgComponent implements OnInit {

    id: Message;
    message: Message = new Message();
    constructor(private MessageService: MessageService,
                private route: ActivatedRoute,
                private router: Router) { }

    updateMessage() {
        this.MessageService.updateMessage(this.id, this.message).subscribe(result => this.goToMessageList())
    }
    onSubmit(){
        this.updateMessage()
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.MessageService.getMessageById(this.id).subscribe(data => {
            this.message = data;
        });
    }

    goToMessageList(){
        this.router.navigate(['/showall']);
    }
}