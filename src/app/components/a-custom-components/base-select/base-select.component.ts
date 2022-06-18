import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    selector: '[formGroup] app-base-select',
    templateUrl: './base-select.component.html',
    styleUrls: ['./base-select.component.scss'],
})
export class BaseSelectComponent implements OnInit {
    @Input() title: string;
    @Input() array: any[];

    @Output() emit_value: EventEmitter<string> = new EventEmitter();
    anyFormGroup: any;
    @Input() fName: any;

    constructor(private controlContainer: ControlContainer) {}

    setValue(value: any) {
        this.emit_value.emit(value);
    }

    ngOnInit(): void {
        this.anyFormGroup = this.controlContainer.control;
    }
}
