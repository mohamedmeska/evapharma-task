import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../shared/helpers/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryService } from './../../../shared/services/country.service';
import { CityService } from './../../../shared/services/city.service';
import { ICity } from './../../../shared/interfaces/i-city';
import { CityModalComponent } from './../../components/city-modal/city-modal.component';

@Component({
  selector: 'city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.sass'],
})
export class CityComponent implements OnInit {
  cityList: ICity[] = [];
  countryId: number;
  countryName: string;
  cityId: number;
  cityPageHeader: string = 'All Cities';
  citySearchInputValue: string;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cityService: CityService,
    private countryService: CountryService,
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe((routeParams) => {
      if(routeParams?.countryId) {
        this.countryId = +routeParams.countryId;
      } else if(routeParams?.cityId) {
        this.cityId = +routeParams.cityId;
      }
    });

    this.authService.isLoader.subscribe((response) => {
      this.isLoading = response;
    });
  }

  ngOnInit(): void {
    if(this.countryId) {
      this.getCountryById(this.countryId);
      this.getCitiesByCountryId(this.countryId);
    } else if (this.cityId) {
      this.getCityById(this.cityId);
    } else {
      this.getAllCities();
    }
  }

  getCountryById(countryId: number) {
    this.authService.isLoader.next(true);
    this.countryService
      .getCountryById(countryId)
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.countryName = response.name;
        },
        (error) => {
          this.authService.isLoader.next(false);
          this.matSnackBar.open(error.message, 'x', {
            duration: 3000
          });
        }
      );
  }

  getCitiesByCountryId(countryId: number) {
    this.authService.isLoader.next(true);
    this.cityService
      .getCitiesByCountryId(countryId)
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.cityPageHeader = `${this.countryName} - All Cities`;
          this.cityList = response;
        },
        (error) => {
          this.authService.isLoader.next(false);
          if(error.status == 401) {
            localStorage.removeItem('user_access_token');
            this.authService.isLoggedIn.next(false);
          }
          this.matSnackBar.open(error.message, 'x', {
            duration: 3000
          });
        }
      );
  }

  getAllCities() {
    this.authService.isLoader.next(true);
    this.cityService
      .getAllCities()
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.cityList = response;
        },
        (error) => {
          this.authService.isLoader.next(false);
          if(error.status == 401) {
            localStorage.removeItem('user_access_token');
            this.authService.isLoggedIn.next(false);
          }
          this.matSnackBar.open(error.message, 'x', {
            duration: 3000
          });
        }
      );
  }

  getCityById(cityId: number) {
    this.authService.isLoader.next(true);
    this.cityService
      .getCityById(cityId)
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.cityPageHeader = `${response.name} City`;
          this.cityList.push(response);
        },
        (error) => {
          this.authService.isLoader.next(false);
          if(error.status == 401) {
            localStorage.removeItem('user_access_token');
            this.authService.isLoggedIn.next(false);
          }
          this.matSnackBar.open(error.message, 'x', {
            duration: 3000
          });
        }
      );
  }

  handleOpenCityModal(actionType: string, city: ICity | null) {
    const dialogRef = this.matDialog.open(CityModalComponent, {
      width: '500px',
      data: {
        action: actionType,
        city,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response.event == 'close') {
        this.matSnackBar.open('The city modal has been closed!', 'x', {
          duration: 3000
        });
      } else if (response.event == 'add') {
        this.addCity(response);
      } else if (response.event == 'update') {
        this.updateCity(response.data.cityName, city);
      } else if (response.event == 'remove') {
        this.removeCity(city);
      }
    });
  }

  addCity(response: any) {
    this.authService.isLoader.next(true);
    let newCityObject = { name: response.data.cityName, countryId: this.countryId };
    this.cityService.addCity(newCityObject).subscribe(
      (response) => {
        this.authService.isLoader.next(false);
        this.cityList.push(response);
      },
      (error) => {
        this.authService.isLoader.next(false);
        this.matSnackBar.open(error, 'x', {
          duration: 3000
        });
      }
    );
  }

  updateCity(updatedCityName: string, city: ICity | null) {
    this.authService.isLoader.next(true);
    this.cityList = this.cityList.filter((cityItem) => {
      if (cityItem.id == city?.id) {
        let oldCityName = cityItem.name;
        cityItem.name = updatedCityName;
        let newCityObject = { id: cityItem.id, name: updatedCityName, countryId: cityItem.countryId };
        this.cityService.updateCity(newCityObject).subscribe(
          (response) => {
            this.authService.isLoader.next(false);
            this.matSnackBar.open(`${oldCityName} country has been updated to ${response.name}`, 'x', {
              duration: 3000
            });
          },
          (error) => {
            this.authService.isLoader.next(false);
            this.matSnackBar.open(error, 'x', {
              duration: 3000
            });
          }
        );
      }
      return true;
    });
  }

  removeCity(city: ICity | any) {
    this.authService.isLoader.next(true);
    this.cityService.removeCity(city.id).subscribe(
      (response) => {
        this.authService.isLoader.next(false);
        this.cityList = this.cityList.filter((cityItem) => {
          return cityItem.id != city.id;
        });
        this.matSnackBar.open(`${response.name} country has been removed`, 'x', {
          duration: 3000
        });
      },
      (error) => {
        this.authService.isLoader.next(false);
        this.matSnackBar.open(error, 'x', {
          duration: 3000
        });
      }
    );
  }
}


