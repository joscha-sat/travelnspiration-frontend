import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../interfaces/create-user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseURL = 'http://localhost:3000/auth/';

    constructor(private http: HttpClient) {}

    register(createUser: CreateUser) {
        return this.http.post(this.baseURL + 'register', createUser);
    }
}
