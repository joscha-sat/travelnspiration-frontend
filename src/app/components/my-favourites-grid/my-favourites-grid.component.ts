import { Component, OnInit } from '@angular/core';
import { TravelPost } from '../../interfaces/travel-post';
import { TravelPostService } from '../../services/travel-post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-my-favourites-grid',
    templateUrl: './my-favourites-grid.component.html',
    styleUrls: ['./my-favourites-grid.component.scss'],
})
export class MyFavouritesGridComponent implements OnInit {
    userId: string;
    myFavPosts: TravelPost[];
    baseUrl = 'http://localhost:3000/travelpost/image/';

    constructor(
        private travelpostService: TravelPostService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // GET THE SELECTED USER ID
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.userId = paramMap.get('userId');
        });

        this.getMyFavouritePosts();
    }

    //    GET ALL POSTS OF THIS CURRENT USER AND GET THE IMAGES TO THOSE POSTS
    getMyFavouritePosts() {
        this.travelpostService
            .getFavPostsByUserId(this.userId)
            .subscribe((res) => {
                this.myFavPosts = res;

                for (let i = 0; i < this.myFavPosts.length; i++) {
                    this.travelpostService
                        .getTravelPostsImages(this.myFavPosts[i].id)
                        .subscribe((res) => {
                            this.myFavPosts[i].image = res[0];
                        });
                }
            });
    }
}
