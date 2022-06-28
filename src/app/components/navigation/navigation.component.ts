import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  currentUser = this.auth.me

  constructor(public auth: AuthService) {
  }

  darkmodeToggle() {
    document.body.classList.toggle('lightTheme');
  }

  logout() {
    this.auth.logout();
  }
}
