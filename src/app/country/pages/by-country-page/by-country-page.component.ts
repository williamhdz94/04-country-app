import { CountryListComponent } from './../../components/country-list/country-list.component';
import { Component } from '@angular/core';
import { CountryInputSearchComponent } from '../../components/country-input-search/country-input-search.component';

@Component({
  selector: 'app-by-country-page',
  imports: [
    CountryInputSearchComponent,
    CountryListComponent
  ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { }
