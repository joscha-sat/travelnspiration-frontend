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

    baseUrl = 'http://localhost:3000/travelpost/image/';

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
        this.getTravelPosts();
    }

    //    GET ALL POSTS OF THIS STATE AND GET THE IMAGES TO THOSE POSTS

    getTravelPosts() {
        this.travelPostService
            .getTravelPostsByState(this.title)
            .subscribe((res) => {
                this.travelPosts = res;

                for (let i = 0; i < this.travelPosts.length; i++) {
                    this.travelPostService
                        .getTravelPostsImages(this.travelPosts[i].id)
                        .subscribe((res) => {
                            this.travelPosts[i].image = res[0];
                        });
                }
            });
    }
}
