import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './../shared/helpers/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/layout/app-header/app-header.component';
import { AppFooterComponent } from './components/layout/app-footer/app-footer.component';
import { LoginComponent } from './routes/login/login.component';
import { CountryComponent } from './routes/country/country.component';
import { CityComponent } from './routes/city/city.component';
import { ApisUrlService } from './../shared/services/apis-url.service';
import { AuthService } from './../shared/helpers/services/auth.service';
import { CountryService } from './../shared/services/country.service';
import { CityService } from './../shared/services/city.service';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { CityModalComponent } from './components/city-modal/city-modal.component';
import { LoaderComponent } from './components/layout/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    LoginComponent,
    CountryComponent,
    CityComponent,
    CountryModalComponent,
    CityModalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ApisUrlService,
    AuthService,
    CountryService,
    CityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
