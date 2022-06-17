import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-base-text-input',
    templateUrl: './base-text-input.component.html',
    styleUrls: ['./base-text-input.component.scss'],
    // viewProviders: [{ provide: ControlContainer, useExisting: FormGroup }], // this part
})
export class BaseTextInputComponent {
    @Input() title: string;
    @Input() icon: string;
    @Input() form: any;
    @Input() fName: string;
    @Input() required: boolean = false;

    @Output() emit_value: EventEmitter<string> = new EventEmitter();

    constructor() {}

    setValue(value: string) {
        this.emit_value.emit(value);
    }
}
