import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/users';
    jwtHelper = new JwtHelperService();

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

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    loggedIn(): boolean {
        const token = this.getToken();
        return !this.jwtHelper.isTokenExpired(token);
    }

    setUser(user: { userId: string; email: string }): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): { userId: string; email: string } {
        return JSON.parse(localStorage.getItem('user'));
    }
}
