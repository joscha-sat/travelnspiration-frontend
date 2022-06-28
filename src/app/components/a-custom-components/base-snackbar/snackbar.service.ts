import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseSnackbarComponent } from './base-snackbar.component';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    public openSnackBar(
        message: string,
        action: string,
        // @ts-ignore
        snackType?: snackType
    ) {
        // @ts-ignore
        const _snackType: snackType =
            snackType !== undefined ? snackType : 'info';

        this.snackBar.openFromComponent(BaseSnackbarComponent, {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            data: { message: message, snackType: _snackType },
            panelClass: [snackType],
        });
    }
}


// panelClass: [
//   _snackType === 'success' ? 'snackBarSuccess' : 'snackBarInfo',
//   _snackType === 'info' ? 'snackBarInfo' : 'snackBarInfo',
//   _snackType === 'warn' ? 'snackBarWarn' : 'snackBarInfo',
//   _snackType === 'error' ? 'snackBarError' : 'snackBarInfo',
// ],
