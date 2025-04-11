import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { Routes } from '@angular/router';
import { CountryLayoutComponent } from '../layouts/country-layout/country-layout.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      { path: 'by-capital', component: ByCapitalPageComponent },
      { path: 'by-pais', component: ByCountryPageComponent },
      { path: 'by-region', component: ByRegionPageComponent },
      { path: 'country-details', component: CountryPageComponent },
      {
        path: '**',
        redirectTo: 'by-capital'
      },
    ],
  }
];

export default countryRoutes;
