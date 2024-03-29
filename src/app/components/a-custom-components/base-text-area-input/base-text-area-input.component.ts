import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: '[formGroup] app-base-text-area-input',
    templateUrl: './base-text-area-input.component.html',
    styleUrls: ['./base-text-area-input.component.scss'],
})
export class BaseTextAreaInputComponent implements OnInit {
    @Input() title: string;
    @Input() required: boolean = false;
    @Input() fName: string;

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
