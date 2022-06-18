import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: '[formGroup] app-base-text-input',
    templateUrl: './base-text-input.component.html',
    styleUrls: ['./base-text-input.component.scss'],
    // viewProviders: [{ provide: ControlContainer, useExisting: FormGroup }], // this part
})
export class BaseTextInputComponent implements OnInit {
    @Input() title: string;
    @Input() icon: string;
    @Input() fName: string;
    @Input() required: boolean = false;

    public anyFormGroup: any;

    @Output() emit_value: EventEmitter<string> = new EventEmitter();

    constructor(private controlContainer: ControlContainer) {}

    setValue(value: string) {
        this.emit_value.emit(value);
    }

    ngOnInit() {
        this.anyFormGroup = this.controlContainer.control;
    }
}
