import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../interfaces/create-user';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseURL = 'http://localhost:3000/auth/';
    currentUser;
    isLoggedIn = false;

    constructor(private http: HttpClient, private router: Router) {}

    get accessToken() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            return;
        }
        return user.accessToken;
    }

    get me() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            return;
        }
        this.isLoggedIn = true;
        this.currentUser = user;

        return user;
    }

    get isLogged() {
        return this.isLoggedIn;
    }

    register(createUser: CreateUser) {
        return this.http.post(this.baseURL + 'register', createUser);
    }

    login(username: string, password: string) {
        return this.http
            .post(this.baseURL + 'login', { username, password })
            .pipe(
                map((user: any) => {
                    if (user && user.accessToken) {
                        localStorage.setItem(
                            'currentUser',
                            JSON.stringify(user)
                        );
                        this.currentUser = user;
                        this.isLoggedIn = true;
                        this.me;
                    }
                    return user;
                })
            );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.isLoggedIn = false;

        this.router.navigate(['login']).then();
    }
}
