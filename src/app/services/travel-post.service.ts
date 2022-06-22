import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelPost } from '../interfaces/travel-post';

@Injectable({
    providedIn: 'root',
})
export class TravelPostService {
    baseURL = 'http://localhost:3000/travelpost/';

    constructor(private http: HttpClient) {}

    // ADD TRAVEL POST ENTRY
    addTravelPosts(travelpost: TravelPost) {
        return this.http.post<TravelPost>(this.baseURL, travelpost);
    }

    // GET ALL TRAVEL POSTS
    getTravelPosts(): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(this.baseURL);
    }

    // GET TRAVEL POST BY ID
    getTravelPostById(id: string): Observable<TravelPost> {
        return this.http.get<TravelPost>(this.baseURL + id);
    }

    // GET FILTERED TRAVEL POSTS BY STATE NAME
    getTravelPostsByState(state: string | null): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(this.baseURL + 'state/' + state);
    }

    // UPDATE TRAVEL POST BY ID
    updateTravelPostById(id: string, travelpost: TravelPost) {
        return this.http.patch(this.baseURL + id, travelpost);
    }

    // DELETE ALL TRAVEL POSTS
    deleteTravelPosts() {
        return this.http.delete(this.baseURL);
    }

    // IMAGE STUFF ---------------------------------------------------------------------- //

    // UPLOAD IMAGE
    uploadImage(file: any) {
        return this.http.post(this.baseURL + 'images', file);
    }

    // GET IMAGE
    getImage(imgPath: string) {
        return this.http.get(this.baseURL + 'image/' + imgPath);
    }
}
