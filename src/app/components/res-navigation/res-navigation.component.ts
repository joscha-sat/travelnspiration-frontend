import { Component, OnInit } from '@angular/core';
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
export class ResNavigationComponent implements OnInit {
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

    enableGER(): void {
        this.translate.use('de');
        localStorage.setItem('LANGUAGE', 'DE');
        this.de = true;
    }

    enableENG(): void {
        this.translate.use('en');
        localStorage.setItem('LANGUAGE', 'ENG');
        this.de = false;
    }

    toggleLanguage() {
        if (this.de) {
            this.enableENG();
        } else {
            this.enableGER();
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

    ngOnInit(): void {
        this.darkMode = localStorage.getItem('THEME');

        if (this.darkMode === 'DARK') {
            this.enableDarkMode();
        } else {
            this.disableDarkMode();
        }

        const language = localStorage.getItem('LANGUAGE');

        if (language === 'DE') {
            this.enableGER();
        } else {
            this.enableENG();
        }
    }
}
