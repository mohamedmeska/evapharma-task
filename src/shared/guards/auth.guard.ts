import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let checkUserLogin = !!localStorage.getItem('user_access_token');
    if (!this.authService.isLoggedIn || !checkUserLogin) {
      this.router.navigate(['login']);
    }
    return this.authService.isLoggedIn.value || checkUserLogin;
  }
}
