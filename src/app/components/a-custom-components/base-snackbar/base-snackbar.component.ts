import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-base-snackbar',
    templateUrl: './base-snackbar.component.html',
    styleUrls: ['./base-snackbar.component.scss'],
})
export class BaseSnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

    get getIcon() {
        switch (this.data.snackType) {
            case 'success':
                return 'done';
            case 'error':
                return 'error';
            case 'warn':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'info';
        }
    }
}
