import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TravelPost } from '../../../interfaces/travel-post';

@Component({
    selector: 'app-base-card',
    templateUrl: './base-card.component.html',
    styleUrls: ['./base-card.component.scss'],
})
export class BaseCardComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() image: string;
    @Input() editable: boolean = false;
    @Input() travelPost: TravelPost;

    @Output() deletePost: EventEmitter<any> = new EventEmitter();
    @Output() editPost: EventEmitter<any> = new EventEmitter();

    constructor() {}

    deletePostEmit() {
        this.deletePost.emit();
    }

    editPostEmit() {
        this.editPost.emit();
    }
}
