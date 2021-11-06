import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../shared/helpers/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CountryService } from './../../../shared/services/country.service';
import { ICountry } from './../../../shared/interfaces/i-country';
import { CountryModalComponent } from './../../components/country-modal/country-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass'],
})
export class CountryComponent implements OnInit {
  countryList: ICountry[] = [];
  countryId: number;
  countryPageHeader: string = 'All Countries';
  isLoading: boolean;
  countrySearchInputValue: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe((routeParams) => {
      if (routeParams) {
        this.countryId = +routeParams.countryId;
      }
    });

    this.authService.isLoader.subscribe((response) => {
      this.isLoading = response;
    });
  }

  ngOnInit(): void {
    if(this.countryId) {
      this.getCountryById(this.countryId);
    } else {
      this.getAllCountries();
    }
  }

  getCountryById(countryId: number) {
    this.authService.isLoader.next(true);
    this.countryService
      .getCountryById(countryId)
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.countryPageHeader = `${response.name} Country`;
          this.countryList.push(response);
        },
        (error) => {
          this.authService.isLoader.next(false);
          if(error.status == 401) {
            localStorage.removeItem('user_access_token');
            localStorage.removeItem('user_email');
            this.authService.isLoggedIn.next(false);
          }
          this.matSnackBar.open(error.message, 'x', {
            duration: 3000
          });
        }
      );
  }

  getAllCountries() {
    this.authService.isLoader.next(true);
    this.countryService
      .getAllCountries()
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.countryList = response;
        },
        (error) => {
          this.authService.isLoader.next(false);
          if(error.status == 401) {
            localStorage.removeItem('user_access_token');
            localStorage.removeItem('user_email');
            this.authService.isLoggedIn.next(false);
          }
          this.matSnackBar.open(error.message, 'x', {
            duration: 3000
          });
        }
      );
  }

  handleOpenCountryModal(actionType: string, country: ICountry | null) {
    const dialogRef = this.matDialog.open(CountryModalComponent, {
      width: '500px',
      data: {
        action: actionType,
        country,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response.event == 'close') {
        this.matSnackBar.open('The country modal has been closed!', 'x', {
          duration: 3000
        });
      } else if (response.event == 'add') {
        this.addCountry(response);
      } else if (response.event == 'update') {
        this.updateCountry(response.data.countryName, country);
      } else if (response.event == 'remove') {
        this.removeCountry(country);
      }
    });
  }

  addCountry(response: any) {
    this.authService.isLoader.next(true);
    let newCountryObject = { name: response.data.countryName };
    this.countryService
      .addCountry(newCountryObject)
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.countryList.push(response);
        },
        (error) => {
          this.authService.isLoader.next(false);
          this.matSnackBar.open(error, 'x', {
            duration: 3000
          });
        }
      );
  }

  updateCountry(updatedCountryName: string, country: ICountry | null) {
    this.authService.isLoader.next(true);
    this.countryList = this.countryList.filter((countryItem) => {
      if (countryItem.id == country?.id) {
        let oldCountryName = countryItem.name;
        countryItem.name = updatedCountryName;
        let newCountryObject = { id: countryItem.id, name: updatedCountryName };
        this.countryService
          .updateCountry(newCountryObject)
          .subscribe(
            (response) => {
              this.authService.isLoader.next(false);
              this.matSnackBar.open(`${oldCountryName} country has been updated to ${response.name}`, 'x', {
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

  removeCountry(country: ICountry | any) {
    this.authService.isLoader.next(false);
    this.countryService
      .removeCountry(country.id)
      .subscribe(
        (response) => {
          this.authService.isLoader.next(false);
          this.countryList = this.countryList.filter((countryItem) => {
            return countryItem.id != country.id;
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
