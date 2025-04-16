import { Component, inject, input } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

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
  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  moreInformation(countrie: ICountry) {
    this.router.navigate(['/country/country-details'], { queryParams: { code: countrie.cca2 } });
  }

}
