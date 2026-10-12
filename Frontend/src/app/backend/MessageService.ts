import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './Message';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class MessageService {

    private readonly msgUrl: string;

    constructor(private http: HttpClient) {
        this.msgUrl = 'http://localhost:8080/messages';
    }

    public findAll(): Observable<Message[]> {
        return this.http.get<Message[]>(this.msgUrl);
    }

    public save(message: Message) {
        return this.http.post<Message>(this.msgUrl, message);
    }

    public getMessageById(id: Message): Observable<Message>{
        return this.http.get<Message>(`${this.msgUrl}/${id}`);
    }

    public updateMessage(id: Message, message: Message): Observable<Object> {
        return this.http.put<Message>(`${this.msgUrl}/${id}`, message);
    }

    public deleteMessage(id: Message): Observable<Object>{
        return this.http.delete(`${this.msgUrl}/${id}`);
    }
}