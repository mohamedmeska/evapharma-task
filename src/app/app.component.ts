import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'eva-pharma-task';
  isLoading: boolean;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoader.subscribe((response) => {
      this.isLoading = response;
    });
  }
}
