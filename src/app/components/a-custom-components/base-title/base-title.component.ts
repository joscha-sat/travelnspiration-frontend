import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-base-title',
    templateUrl: './base-title.component.html',
    styleUrls: ['./base-title.component.scss'],
})
export class BaseTitleComponent {
    @Input() ngTranslate: string;

    constructor() {}
}
