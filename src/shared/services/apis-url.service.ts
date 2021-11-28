import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisUrlService {

  baseUrl: string = 'https://taskfrontendapi.azurewebsites.net/api/';

  login: string = this.baseUrl + 'user/login';
  country: string = this.baseUrl + 'country';
  city: string = this.baseUrl + 'city';
  countryCity: string = this.baseUrl + 'city/getcities';

  constructor() { }
}
