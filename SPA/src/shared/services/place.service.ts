import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PlaceService {
    baseUrl = 'http://localhost:5000/api/places';

    constructor(private http: HttpClient) {}

    getPlacesByUserId(userId: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/user/${userId}`);
    }

    getPlaceDetails(placeId: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${placeId}`);
    }

    createPlace(place: any): Observable<any> {
        const formData = new FormData();

        formData.append('title', place.title);
        formData.append('description', place.description);
        formData.append('address', place.address);
        formData.append('creator', place.creator);
        formData.append('image', place.image);
        // const headers = new HttpHeaders().set('Authorization',
            // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VkSWQiOiI2NGRkMGJmOGJlYTUxNzM3NGFkNThkYmMiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTIyNzY2NzksImV4cCI6MTY5MjI4MDI3OX0.d0siXWpZhUebdUEVHNGE9B1v5jkJFySxyOPhlWLdssE');
        // return this.http.post<any>(`${this.baseUrl}`, place, { headers });
        return this.http.post<any>(`${this.baseUrl}`, formData);
    }

    updatePlace(placeId: any, place: any): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/${placeId}`, place);
    }

    deletePlace(placeId: any): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${placeId}`);
    }
}
