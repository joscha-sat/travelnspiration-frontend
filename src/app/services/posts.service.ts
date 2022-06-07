import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    baseURL = 'http://localhost:3000/';
    posts: any[] = [];

    constructor(private http: HttpClient) {}

    // FUNCTIONS

    fetchPosts() {
        this.http
            .get<{ message: string; posts: [] }>(this.baseURL + 'posts')
            .subscribe((res) => {
                this.posts = res.posts;
            });
    }
}
