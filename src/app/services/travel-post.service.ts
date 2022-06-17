import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelPost } from '../interfaces/travel-post';

@Injectable({
    providedIn: 'root',
})
export class TravelPostService {
    baseURL = 'http://localhost:3000/';

    constructor(private http: HttpClient) {}

    // GET FILTERED TRAVEL POSTS BY STATE NAME
    getTravelPostsByState(state: string | null): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(
            this.baseURL + 'travelPost/state/' + state
        );
    }
}
