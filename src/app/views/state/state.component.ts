import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit {
    title: string | null = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        // RESET TITLE
        this.title = '';

        // GET THE SELECTED STATE NAME
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.title = paramMap.get('state');
        });
    }
}
