import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-empty-travels',
    templateUrl: './empty-travels.component.html',
    styleUrls: ['./empty-travels.component.scss'],
})
export class EmptyTravelsComponent {
    @Input() travelPosts: any[];
    @Input() info: string;

    constructor() {}
}
