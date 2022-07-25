import { AfterViewInit, Component } from '@angular/core';
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
export class ResNavigationComponent implements AfterViewInit {
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );

    de = true;

    darkMode: string | null;

    constructor(
        private breakpointObserver: BreakpointObserver,
        public auth: AuthService,
        private translate: TranslateService
    ) {}

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

    // enable dark mode
    enableDarkMode(): void {
        document.body.classList.remove('lightTheme');
        localStorage.setItem('THEME', 'DARK');
    }

    // disable dark mode
    disableDarkMode(): void {
        document.body.classList.add('lightTheme');
        localStorage.setItem('THEME', 'LIGHT');
    }

    // toggle dark mode eg via button
    darkmodeToggle(): void {
        this.darkMode = localStorage.getItem('THEME');

        if (this.darkMode === 'DARK') {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    // check local storage which theme the user has selected to activate it after reload
    ngAfterViewInit(): void {
        this.darkMode = localStorage.getItem('THEME');

        if (this.darkMode === 'DARK') {
            this.enableDarkMode();
        } else {
            this.disableDarkMode();
        }
    }
}
