import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/users';

    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}`);
    }

    login(userLogin: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/login`, userLogin);
    }

    register(userToRegister: any): Observable<any> {
        const formData = new FormData();

        formData.append('email', userToRegister.email);
        formData.append('name', userToRegister.name);
        formData.append('password', userToRegister.password);
        formData.append('image', userToRegister.image);

        return this.http.post<any>(`${this.baseUrl}/signup`, formData);
    }
}
