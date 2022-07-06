import { Injectable } from '@angular/core';
import { TravelPost } from '../interfaces/travel-post';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    constructor() {}

    filterArray(array: TravelPost[], search: string): TravelPost[] {
        if (!array || !array.length) {
            return null;
        }

        return array.filter((result) => {
            return (
                result.title.toLowerCase().match(search.toLowerCase()) ||
                result.location.toLowerCase().match(search.toLowerCase())
            );
        });
    }
}
