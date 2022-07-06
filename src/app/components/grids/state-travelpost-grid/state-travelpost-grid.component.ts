import { Component, OnInit } from '@angular/core';
import { TravelPost } from '../../../interfaces/travel-post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TravelPostService } from '../../../services/travel-post.service';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../a-custom-components/base-snackbar/snackbar.service';
import { FilterService } from '../../../services/filter.service';

@Component({
    selector: 'app-state-travelpost-grid',
    templateUrl: './state-travelpost-grid.component.html',
    styleUrls: ['./state-travelpost-grid.component.scss'],
})
export class StateTravelpostGridComponent implements OnInit {
    title: string | null = '';

    baseUrl = 'http://localhost:3000/travelpost/image/';

    travelPosts: TravelPost[];
    //    GET ALL POSTS OF THIS STATE AND GET THE IMAGES TO THOSE POSTS
    search: string = '';

    constructor(
        private route: ActivatedRoute,
        private travelPostService: TravelPostService,
        private auth: AuthService,
        private snackBarService: SnackbarService,
        public filterService: FilterService
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

    addToFavList(postId: string) {
        if (!this.auth.me.id) {
            return;
        }

        this.travelPostService
            .addTravelPostToFav(this.auth.me.id, postId)
            .subscribe(() => {
                this.snackBarService.openSnackBar(
                    'successfully added',
                    'ok',
                    'success'
                );
            });
    }

    setSearch($event: any) {
        this.search = $event;
    }
}
