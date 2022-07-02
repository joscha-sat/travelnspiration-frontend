import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: '[formGroup] app-base-number-input',
    templateUrl: './base-number-input.component.html',
    styleUrls: ['./base-number-input.component.scss'],
})
export class BaseNumberInputComponent implements OnInit {
    @Input() title: string;
    @Input() icon: string;
    @Input() required: boolean = false;
    @Input() fName: string;

    public anyFormGroup: any;

    value: number;

    @Output() emit_value: EventEmitter<number> = new EventEmitter();

    constructor(private controlContainer: ControlContainer) {}

    setValue(value: string) {
        this.emit_value.emit(+value);
    }

    ngOnInit() {
        this.anyFormGroup = this.controlContainer.control;
    }
}
