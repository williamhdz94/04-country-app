import { Component, inject, input } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {

  router = inject(Router);
  countries = input.required<ICountry[]>();

  moreInformation(countrie: ICountry) {
    this.router.navigate(['/country/country-details'], { queryParams: { code: countrie.cca2 } });
  }

}
