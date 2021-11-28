import { ICity } from './../interfaces/i-city';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisUrlService } from './../services/apis-url.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private http: HttpClient,
    private apisUrlService: ApisUrlService
  ) {}

  getAllCities(): Observable<[]> {
    return this.http
      .get<[]>(this.apisUrlService.city)
      .pipe(
        catchError((error) => {
          return throwError(error || 'Server Error!');
        })
      );
  }

  getCityById(cityId: number): Observable<ICity> {
    return this.http
      .get<ICity>(`${this.apisUrlService.city}/${cityId}`)
      .pipe(
        catchError((error) => {
          return throwError(error || 'Server Error!');
        })
      );
  }

  getCitiesByCountryId(countryId: number): Observable<[]> {
    return this.http
      .get<[]>(`${this.apisUrlService.countryCity}/${countryId}`)
      .pipe(
        catchError((error) => {
          return throwError(error || 'Server Error!');
        })
      );
  }

  addCity(city: {}): Observable<ICity> {
    return this.http
      .post<ICity>(this.apisUrlService.city, city)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  updateCity(city: {}): Observable<ICity> {
    return this.http
      .put<ICity>(this.apisUrlService.city, city)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  removeCity(cityId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apisUrlService.city}/${cityId}`)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }
}
