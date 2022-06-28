import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderTokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (this.auth.accessToken) {
            const fullToken = 'Bearer' + this.auth.accessToken;

            const authReq = request.clone({
                setHeaders: { Authorization: fullToken },
            });
            return next.handle(authReq);
        }
        return next.handle(request);
    }
}
