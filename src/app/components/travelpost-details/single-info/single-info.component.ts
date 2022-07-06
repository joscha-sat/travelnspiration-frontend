import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-single-info',
    templateUrl: './single-info.component.html',
    styleUrls: ['./single-info.component.scss'],
})
export class SingleInfoComponent {
    @Input() info: string | number;
    @Input() ngTranslate: string;
    @Input() costs: boolean = false;

    constructor() {}
}
