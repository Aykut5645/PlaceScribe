import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/places';

    constructor(private http: HttpClient) {}

    getPlacesByUserId(userId: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${userId}`);
    }

    getPlaceDetails(placeId: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${placeId}`);
    }

    createPlace(place: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, place);
    }

    updatePlace(placeId: any, place: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${placeId}`, place);
    }

    deletePlace(placeId: any): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${placeId}`);
    }
}
