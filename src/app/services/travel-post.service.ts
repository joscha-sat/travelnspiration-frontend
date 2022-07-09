import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { TravelPost } from '../interfaces/travel-post';

@Injectable({
    providedIn: 'root',
})
export class TravelPostService {
    baseURL = 'http://localhost:3000/travelpost/';

    constructor(private http: HttpClient) {}

    private _updater$ = new Subject<void>();

    get updater$() {
        return this._updater$;
    }

    // ADD TRAVEL POST ENTRY
    addTravelPosts(formData: FormData) {
        return this.http.post<TravelPost>(this.baseURL, formData);
    }

    // ADD TRAVEL POST TO FAV LIST
    addTravelPostToFav(userId: string, postId: string) {
        return this.http.put(`http://localhost:3000/users/addFavPost`, {
            userId: userId,
            postId: postId,
        });
    }

    // GET ALL TRAVEL POSTS
    getTravelPosts(): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(this.baseURL);
    }

    // GET ALL TRAVEL POSTS IMAGES
    getTravelPostsImages(id: string): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:3000/photos/' + id);
    }

    // GET TRAVEL POST BY ID
    getTravelPostById(id: string): Observable<TravelPost> {
        return this.http.get<TravelPost>(this.baseURL + id);
    }

    // GET FILTERED TRAVEL POSTS BY STATE NAME
    getTravelPostsByState(state: string | null): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(this.baseURL + 'state/' + state);
    }

    // GET FILTERED TRAVEL POSTS BY USER ID
    getTravelPostsByUserId(id: string | null): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(this.baseURL + 'user/' + id);
    }

    // GET FILTERED TRAVEL POSTS BY FAVOURITES
    getFavPostsByUserId(id: string | null): Observable<TravelPost[]> {
        return this.http.get<TravelPost[]>(
            'http://localhost:3000/users/favourites/' + id
        );
    }

    // UPDATE TRAVEL POST BY ID
    updateTravelPostById(id: string, travelpost: TravelPost) {
        return this.http.patch(this.baseURL + id, travelpost);
    }

    // DELETE ALL TRAVEL POSTS
    deleteTravelPosts() {
        return this.http.delete(this.baseURL);
    }

    // DELETE ONE TRAVEL POSTS
    deleteOneTravelPosts(id: string) {
        return this.http.delete(this.baseURL + id);
    }

    // DELETE ONE TRAVEL POSTS IN MY FAV
    deleteOneFavTravelPost(userId: string, postId: string) {
        return this.http
            .put(`http://localhost:3000/users/delete/favPost`, {
                userId: userId,
                postId: postId,
            })
            .pipe(
                tap(() => {
                    this._updater$.next();
                })
            );
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
