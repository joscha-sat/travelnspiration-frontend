import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-base-text-area-input',
    templateUrl: './base-text-area-input.component.html',
    styleUrls: ['./base-text-area-input.component.scss'],
})
export class BaseTextAreaInputComponent {
    @Input() title: string;

    constructor() {}
}
