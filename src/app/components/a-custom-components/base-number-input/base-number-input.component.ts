import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-number-input',
  templateUrl: './base-number-input.component.html',
  styleUrls: ['./base-number-input.component.scss'],
})
export class BaseNumberInputComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() required: boolean = false;

  value: number

  @Output() emit_value: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  setValue(value: string) {
    this.emit_value.emit(+value);
  }
}
