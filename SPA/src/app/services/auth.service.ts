import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/users/signup';

    constructor(private http: HttpClient, private router: Router, private store: Store) {}

    login(userLogin: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/login`, userLogin);
    }

    register(userToRegister: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/signup`, userToRegister);
    }
}
