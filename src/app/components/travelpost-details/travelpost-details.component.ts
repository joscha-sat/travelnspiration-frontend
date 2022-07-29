import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { TravelPostService } from '../../services/travel-post.service';
import { TravelPost } from '../../interfaces/travel-post';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../a-custom-components/base-snackbar/snackbar.service';

@Component({
    selector: 'app-travelpost-details',
    templateUrl: './travelpost-details.component.html',
    styleUrls: ['./travelpost-details.component.scss'],
})
export class TravelpostDetailsComponent implements OnInit {
    id: string | null = '';
    imageAmount: number;
    baseUrl = 'http://localhost:3000/travelpost/image/';
    images: any[] = [];
    travelpost: TravelPost = {} as TravelPost;
    screenWidth: number;

    constructor(
        private route: ActivatedRoute,
        private travelPostService: TravelPostService,
        public auth: AuthService,
        private translate: TranslateService,
        private snackBarService: SnackbarService
    ) {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenWidth = event.target.innerWidth;
    }

    addFavPost() {
        if (!this.auth.me.id) {
            return;
        }

        this.travelPostService
            .addTravelPostToFav(this.auth.me.id, this.id)
            .subscribe(() => {
                let snackInfoText;

                this.translate
                    .get('SNACKBAR.SUCCESSFUL_ADDED')
                    .subscribe((res) => {
                        snackInfoText = res;
                    });

                this.snackBarService.openSnackBar(
                    snackInfoText,
                    'ok',
                    'success'
                );
            });
    }

    ngOnInit(): void {
        // RESET TITLE
        this.id = '';
        this.screenWidth = window.innerWidth;

        // GET THE SELECTED STATE NAME
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.id = paramMap.get('id');

            if (this.id) {
                this.travelPostService
                    .getTravelPostById(this.id.toString())
                    .subscribe((res) => {
                        this.travelpost = res;

                        this.getTravelPostImages();
                    });
            }
        });
    }

    //    GET ALL POSTS OF THIS STATE AND GET THE IMAGES TO THOSE POSTS

    getTravelPostImages() {
        this.travelPostService
            .getTravelPostsImages(this.travelpost.id)
            .subscribe((res) => {
                this.imageAmount = res.length;

                for (let i = 0; i < res.length; i++) {
                    this.images.push(
                        new ImageItem({
                            src: this.baseUrl + res[i],
                            thumb: this.baseUrl + res[i],
                        })
                    );
                }
            });
    }
}
