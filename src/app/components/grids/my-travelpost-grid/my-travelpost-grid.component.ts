import { Component, OnInit } from '@angular/core';
import { TravelPost } from '../../../interfaces/travel-post';
import { TravelPostService } from '../../../services/travel-post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FilterService } from '../../../services/filter.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-my-travelpost-grid',
    templateUrl: './my-travelpost-grid.component.html',
    styleUrls: ['./my-travelpost-grid.component.scss'],
})
export class MyTravelpostGridComponent implements OnInit {
    userId: string;
    myTravelPosts: TravelPost[];
    baseUrl = 'http://localhost:3000/travelpost/image/';
    search: string = '';
    rightUser: boolean = true;

    constructor(
        private travelpostService: TravelPostService,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        public filterService: FilterService
    ) {}

    ngOnInit(): void {
        // GET THE SELECTED USER ID
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.userId = paramMap.get('id');
        });

        if (+this.userId !== this.auth.me.id) {
            this.rightUser = false;
            return;
        }

        this.getMyTravelPosts();
    }

    //    GET ALL POSTS OF THIS CURRENT USER AND GET THE IMAGES TO THOSE POSTS
    getMyTravelPosts() {
        this.travelpostService
            .getTravelPostsByUserId(this.userId)
            .subscribe((res) => {
                this.myTravelPosts = res;

                for (let i = 0; i < this.myTravelPosts.length; i++) {
                    this.travelpostService
                        .getTravelPostsImages(this.myTravelPosts[i].id)
                        .subscribe((res) => {
                            this.myTravelPosts[i].image = res[0];
                        });
                }
            });
    }

    deletePost(id: string) {
        this.travelpostService.deleteOneTravelPosts(id).subscribe(() => {
            this.getMyTravelPosts();
        });
    }

    editPost(id: string) {
        this.router.navigate(['editTravelpost/', id]).then();
    }

    setSearch($event: any) {
        this.search = $event;
    }
}
