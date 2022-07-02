import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../components/a-custom-components/base-snackbar/snackbar.service';

@Injectable()
export class HeaderTokenInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private snackBarService: SnackbarService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.auth.accessToken) {
            const fullToken = 'Bearer' + this.auth.accessToken;

            const authReq = request.clone({
                setHeaders: { Authorization: fullToken },
            });
            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = 'An unknown error occurred!';

                    if (error.error.message) {
                        errorMessage = error.error.message;
                    }

                    this.snackBarService.openSnackBar(
                        errorMessage,
                        '',
                        'error'
                    );
                    return throwError(() => error);
                })
            );
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occurred!';

                if (error.error.message) {
                    errorMessage = error.error.message;
                }

                this.snackBarService.openSnackBar(errorMessage, '', 'error');
                return throwError(() => error);
            })
        );
    }
}
