import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    @Input() ngTranslate: string;
    @Output() searchEmit: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    emitSearch(searchValue: string) {
        this.searchEmit.emit(searchValue);
    }
}
