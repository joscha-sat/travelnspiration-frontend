import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-base-validation-error',
    templateUrl: './base-validation-error.component.html',
    styleUrls: ['./base-validation-error.component.scss'],
})
export class BaseValidationErrorComponent {
    @Input() form: FormGroup;
    @Input() fName: string;
    @Input() validator: string;
    @Input() validator2: string;
    @Input() ngxTranslate: string;
    @Input() ngxTranslate2: string;

    constructor() {}
}
