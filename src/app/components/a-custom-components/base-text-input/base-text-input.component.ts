import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-base-text-input',
    templateUrl: './base-text-input.component.html',
    styleUrls: ['./base-text-input.component.scss'],
})
export class BaseTextInputComponent {
    @Input() title: string;

    constructor() {}
}
