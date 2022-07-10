import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-res-navigation',
    templateUrl: './res-navigation.component.html',
    styleUrls: ['./res-navigation.component.scss'],
})
export class ResNavigationComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );

    de = true;

    constructor(
        private breakpointObserver: BreakpointObserver,
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
