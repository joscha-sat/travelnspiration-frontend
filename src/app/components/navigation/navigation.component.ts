import { AfterViewInit, Component } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements AfterViewInit {
    private darkTheme: boolean;
    constructor(private darkmodeService: DarkmodeService) {}

    darkmodeToggle() {
        this.darkmodeService.darkModeToggle();
        this.darkTheme = !this.darkTheme;
    }

    //Init
    ngAfterViewInit(): void {
        const darkMode: string | null = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            this.darkmodeService.enableDarkMode();
            this.darkTheme = true;
        } else {
            this.darkmodeService.disableDarkMode();
            this.darkTheme = false;
        }
    }
}
