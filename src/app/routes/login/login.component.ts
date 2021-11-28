import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  authToken: string;
  loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let checkUserLogin = !!localStorage.getItem('user_access_token');

    if (this.authService.isLoggedIn || checkUserLogin) {
      this.router.navigate(['country']);
    }

    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLoginSubmit() {
    this.authService
      .login(this.loginFormGroup.value)
      .subscribe(
        (response: any) => {
          localStorage.setItem('user_access_token', response.token);
          let authToken = localStorage.getItem('user_access_token');
          if (authToken !== null) {
            this.authService.isLoggedIn.next(true);
          }
          this.authService.currentUser.next(this.loginFormGroup.value);
          localStorage.setItem('user_email', this.loginFormGroup.value.email);
          this.router.navigate(['country']);
          this.matSnackBar.open('You have successfully loged in.', 'x', {
            duration: 3000
          });
        },
        (error) => {
          this.matSnackBar.open(error, 'x', {
            duration: 3000
          });
        }
      );
  }
}
