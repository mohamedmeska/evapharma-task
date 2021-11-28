import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisUrlService } from './../services/apis-url.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from './../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject(<IUser>{});
  isLoggedIn = new BehaviorSubject(false);
  isLoader = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private apisUrlService: ApisUrlService
  ) {}

  login(user: any) {
    return this.http
      .post<any>(this.apisUrlService.login, user)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  getToken() {
    return localStorage.getItem('user_access_token');
  }
}

