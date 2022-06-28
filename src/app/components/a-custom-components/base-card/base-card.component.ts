import { Component, Input } from '@angular/core';
import { TravelPost } from '../../../interfaces/travel-post';
import { TravelPostService } from '../../../services/travel-post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-base-card',
    templateUrl: './base-card.component.html',
    styleUrls: ['./base-card.component.scss'],
})
export class BaseCardComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() image: string;
    @Input() editable: boolean = false;
    @Input() travelPost: TravelPost;

    constructor(
        private travelpostService: TravelPostService,
        private route: ActivatedRoute
    ) {}

    deletePost(id: string) {
        this.travelpostService.deleteOneTravelPosts(id).subscribe(() => {
            // GET THE SELECTED USER ID
            this.route.paramMap.subscribe((paramMap: ParamMap) => {
                let userId = paramMap.get('id');

                this.travelpostService
                    .getTravelPostsByUserId(userId)
                    .subscribe((res) => {
                        console.log(res);
                    });
            });
        });
    }
}
