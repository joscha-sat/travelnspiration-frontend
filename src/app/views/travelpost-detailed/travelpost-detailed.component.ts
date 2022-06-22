import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TravelPost } from '../../interfaces/travel-post';
import { TravelPostService } from '../../services/travel-post.service';

@Component({
    selector: 'app-travelpost-detailed',
    templateUrl: './travelpost-detailed.component.html',
    styleUrls: ['./travelpost-detailed.component.scss'],
})
export class TravelpostDetailedComponent implements OnInit {
    id: string | null = '';

    travelpost: TravelPost = {} as TravelPost;

    constructor(
        private route: ActivatedRoute,
        private travelPostService: TravelPostService
    ) {}

    ngOnInit(): void {
        // RESET TITLE
        this.id = '';

        // GET THE SELECTED STATE NAME
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = paramMap.get('id');

            if (this.id) {
                this.travelPostService
                    .getTravelPostById(this.id.toString())
                    .subscribe((res) => {
                        this.travelpost = res;
                    });
            }
        });
    }
}
