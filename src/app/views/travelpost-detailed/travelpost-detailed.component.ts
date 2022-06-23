import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TravelPost } from '../../interfaces/travel-post';
import { TravelPostService } from '../../services/travel-post.service';
import { ImageItem } from 'ng-gallery';

@Component({
    selector: 'app-travelpost-detailed',
    templateUrl: './travelpost-detailed.component.html',
    styleUrls: ['./travelpost-detailed.component.scss'],
})
export class TravelpostDetailedComponent implements OnInit {
    id: string | null = '';
    imageAmount: number;

    baseUrl = 'http://localhost:3000/travelpost/image/';

    images: any[] = [];

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

                console.log(res);

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
