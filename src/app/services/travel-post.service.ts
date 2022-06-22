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

    // ADD TRAVEL POST ENTRY
    addTravelPosts(travelPost: TravelPost) {
        return this.http.post<TravelPost>(
            this.baseURL + 'travelPost',
            travelPost
        );
    }

    // UPLOAD IMAGE
    uploadImage(file: any) {
        return this.http.post(this.baseURL + 'travelPost/images', file);
    }

    // GET IMAGE
    getImage(imgPath: string) {
        return this.http.get(this.baseURL + 'travelPost/image/' + imgPath);
    }
}
