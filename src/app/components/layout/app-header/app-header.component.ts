import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../../shared/services/auth.service';
import { IUser } from './../../../../shared/interfaces/i-user';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.sass'],
})
export class AppHeaderComponent implements OnInit {
  checkUserLogin: boolean;
  isLoggedIn: boolean;
  currentUser: IUser;
  userEmail: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkUserLogin = !!localStorage.getItem('user_access_token');
    this.userEmail = localStorage.getItem('user_email') || '';

    this.authService.isLoggedIn.subscribe((response) => {
      this.isLoggedIn = response;
    });
    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
  }

  handleLogout() {
    this.authService.isLoggedIn.next(false);
    this.checkUserLogin = false;
    localStorage.removeItem('user_email');
    let removedToken = localStorage.removeItem('user_access_token');
    if (removedToken == null) {
      this.router.navigate(['login']);
    }
  }
}
