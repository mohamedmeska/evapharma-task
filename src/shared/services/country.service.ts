import { ICountry } from './../interfaces/i-country';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisUrlService } from './../services/apis-url.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private http: HttpClient,
    private apisUrlService: ApisUrlService
  ) {}

  getAllCountries(): Observable<[]> {
    return this.http
      .get<[]>(this.apisUrlService.country)
      .pipe(
        catchError((error) => {
          return throwError(error || 'Server Error!');
        })
      );
  }

  getCountryById(countryId: number): Observable<ICountry> {
    return this.http
      .get<ICountry>(`${this.apisUrlService.country}/${countryId}`)
      .pipe(
        catchError((error) => {
          return throwError(error || 'Server Error!');
        })
      );
  }

  addCountry(country: {}): Observable<ICountry> {
    return this.http
      .post<ICountry>(this.apisUrlService.country, country)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  updateCountry(country: {}): Observable<ICountry> {
    return this.http
      .put<ICountry>(this.apisUrlService.country, country)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  removeCountry(countryId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apisUrlService.country}/${countryId}`)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }
}
