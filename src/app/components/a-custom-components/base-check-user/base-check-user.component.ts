import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-base-check-user',
    templateUrl: './base-check-user.component.html',
    styleUrls: ['./base-check-user.component.scss'],
})
export class BaseCheckUserComponent {
    @Input() rightUser: boolean;
    @Input() info: string;

    constructor() {}
}
