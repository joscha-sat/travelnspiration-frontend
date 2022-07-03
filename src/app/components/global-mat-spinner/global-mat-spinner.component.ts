import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-global-mat-spinner',
    templateUrl: './global-mat-spinner.component.html',
    styleUrls: ['./global-mat-spinner.component.scss'],
})
export class GlobalMatSpinnerComponent {
    isLoading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private loaderService: LoaderService) {}
}
