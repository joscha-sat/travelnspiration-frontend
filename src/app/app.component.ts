import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        private auth: AuthService
    ) {
        translate.setDefaultLang('de');
        translate.use('de');
    }

    ngOnInit(): void {
        this.auth.me;
    }
}
