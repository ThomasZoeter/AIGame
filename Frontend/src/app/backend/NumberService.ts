import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Number } from './number';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class NumberService {

    private readonly numUrl: string;

    constructor(private http: HttpClient) {
        this.numUrl = 'http://localhost:8080/numbers';
    }

    public findAll(): Observable<Number[]> {
        return this.http.get<Number[]>(this.numUrl);
    }

    public save(number: Number) {
        console.log("Num.number: " + number.number)
        return this.http.post<Number>(this.numUrl, number);
    }

    public deleteNumber(id: number): Observable<Object>{
        return this.http.delete(`${this.numUrl}/${id}`);
    }
}