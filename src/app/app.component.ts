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

        const language = localStorage.getItem('LANGUAGE');

        if (language === 'DE') {
            this.translate.use('de');
        } else {
            this.translate.use('en');
        }
    }

    ngOnInit(): void {
        this.auth.me;

        let cc = window as any;

        cc.cookieconsent.initialise({
            palette: {
                popup: {
                    background: '#776955',
                },
                button: {
                    background: '#ffe000',
                    text: '#000000',
                },
            },
            theme: 'classic',
            content: {
                message: 'haha',
                dismiss: 'OK!',
                link: '',
            },
        });
    }
}
