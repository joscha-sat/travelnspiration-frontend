import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-base-text-area-input',
    templateUrl: './base-text-area-input.component.html',
    styleUrls: ['./base-text-area-input.component.scss'],
})
export class BaseTextAreaInputComponent {
    @Input() title: string;
    @Input() required: boolean = false;

    @Output() emit_value: EventEmitter<string> = new EventEmitter();

    constructor() {}

    setValue(value: string) {
        this.emit_value.emit(value);
    }
}
