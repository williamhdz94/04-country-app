import { Component, input } from '@angular/core';
import { CountryInputSearchComponent } from '../../components/country-input-search/country-input-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    CountryInputSearchComponent,
    CountryListComponent
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  valueSearch = input<string>();

  constructor() {
    console.log(this.valueSearch());
  }

}
