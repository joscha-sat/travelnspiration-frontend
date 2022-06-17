import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TravelPostService } from '../../services/travel-post.service';
import { TravelPost } from '../../interfaces/travel-post';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit {
    title: string | null = '';

    travelPosts: TravelPost[];

    constructor(
        private route: ActivatedRoute,
        private travelPostService: TravelPostService
    ) {}

    ngOnInit(): void {
        // RESET TITLE
        this.title = '';

        // GET THE SELECTED STATE NAME
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.title = paramMap.get('state');
        });

        // SET THE TRAVEL POST ARRAY TO DATABASE DATA DEPENDING ON STATE NAME
        this.travelPostService
            .getTravelPostsByState(this.title)
            .subscribe((res) => {
                this.travelPosts = res;
            });
    }
}
