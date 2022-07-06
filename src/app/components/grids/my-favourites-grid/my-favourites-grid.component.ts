import { Component, OnInit } from '@angular/core';
import { TravelPost } from '../../../interfaces/travel-post';
import { TravelPostService } from '../../../services/travel-post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FilterService } from '../../../services/filter.service';

@Component({
    selector: 'app-my-favourites-grid',
    templateUrl: './my-favourites-grid.component.html',
    styleUrls: ['./my-favourites-grid.component.scss'],
})
export class MyFavouritesGridComponent implements OnInit {
    userId: string;
    myFavPosts: TravelPost[];
    baseUrl = 'http://localhost:3000/travelpost/image/';
    search: string = '';

    constructor(
        private travelpostService: TravelPostService,
        private route: ActivatedRoute,
        private auth: AuthService,
        public filterService: FilterService
    ) {}

    ngOnInit(): void {
        // GET THE SELECTED USER ID
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.userId = paramMap.get('userId');
        });

        this.getMyFavouritePosts();
    }

    //    GET ALL FAV POSTS OF THIS CURRENT USER AND GET THE IMAGES TO THOSE POSTS
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

    deleteFavPost(postId: string) {
        if (!this.auth.me || !this.auth.isLoggedIn) {
            return;
        }

        this.travelpostService
            .deleteOneFavTravelPost(this.userId, postId)
            .subscribe(() => {
                this.getMyFavouritePosts();
            });
    }

    setSearch($event: any) {
        this.search = $event;
    }
}
