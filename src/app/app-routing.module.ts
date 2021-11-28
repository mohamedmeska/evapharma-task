import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CityComponent } from './routes/city/city.component';
import { CountryComponent } from './routes/country/country.component';
import { LoginComponent } from './routes/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'country',
    component: CountryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'country/:countryId',
    component: CountryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'country/:countryId/city',
    component: CityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'city',
    component: CityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'city/:cityId',
    component: CityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
