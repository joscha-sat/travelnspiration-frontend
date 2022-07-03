import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TravelPost } from '../../../interfaces/travel-post';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-base-card',
    templateUrl: './base-card.component.html',
    styleUrls: ['./base-card.component.scss'],
})
export class BaseCardComponent implements OnInit {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() image: string;
    @Input() editable: boolean = false;
    @Input() deletable: boolean = false;
    @Input() favouritable: boolean = false;
    @Input() travelPost: TravelPost;
    @Input() id: string;
    @Input() state: string;

    @Output() deletePost: EventEmitter<any> = new EventEmitter();
    @Output() editPost: EventEmitter<any> = new EventEmitter();
    @Output() AddFavPostEvent: EventEmitter<any> = new EventEmitter();

    loggedIn = false;

    constructor(private auth: AuthService) {}

    deletePostEmit() {
        this.deletePost.emit();
    }

    editPostEmit() {
        this.editPost.emit();
    }

    addFavPost() {
        this.AddFavPostEvent.emit();
    }

    ngOnInit(): void {
        this.loggedIn = this.auth.isLogged;
    }
}
