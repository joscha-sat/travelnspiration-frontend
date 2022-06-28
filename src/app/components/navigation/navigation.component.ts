import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    constructor(public auth: AuthService) {}

    darkmodeToggle() {
        document.body.classList.toggle('lightTheme');
    }

    logout() {
        this.auth.logout();
        console.log(this.auth.isLoggedIn);
    }

    ngOnInit(): void {
        console.log(this.auth.isLoggedIn);
    }
}
