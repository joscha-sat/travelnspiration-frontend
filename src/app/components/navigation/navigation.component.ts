import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    de = true;

    constructor(
        public auth: AuthService,
        private translate: TranslateService
    ) {}

    darkmodeToggle() {
        document.body.classList.toggle('lightTheme');
    }

    logout() {
        this.auth.logout();
    }

    toggleLanguage() {
        if (this.de) {
            this.translate.use('en');
            this.de = false;
        } else {
            this.translate.use('de');
            this.de = true;
        }
    }
}
