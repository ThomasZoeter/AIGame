import {Component, OnInit, signal} from '@angular/core';
import { Message } from '../../backend/Message';
import { MessageService } from '../../backend/MessageService';
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'Message-list',
    templateUrl: './msg-list-component.html',
    imports: [
        RouterLink
    ],
    standalone: true,
    styleUrls: ['./msg-list-component.css']
})
export class MessageListComponent implements OnInit {

    msg: Message[] = []

    messages = signal(this.msg);

    constructor(private MessageService: MessageService, private router: Router) {
    }

    ngOnInit() {
        this.getMessages();
    }

    private getMessages(){
        this.MessageService.findAll().subscribe(data => {
            this.messages.update(() => data);
        });
    }

    goToAddEntity() {
        this.router.navigate(['/add-message'])
    }

    deleteMessage(id: Message) {
        this.MessageService.deleteMessage(id).subscribe(data => {
            this.getMessages();
        })
    }

    updateMessage(id: Message) {
        this.router.navigate(['update-message', id])
    }
}