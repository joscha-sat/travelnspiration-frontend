import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit {
    title: string | null;

    constructor(
        private route: ActivatedRoute,
        private postService: PostsService
    ) {}

    get posts() {
        return this.postService.posts;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.title = paramMap.get('bundesland');
        });

        this.postService.fetchPosts();

        console.log(this.posts);
    }
}
