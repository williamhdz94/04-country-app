import { Component, computed, input } from '@angular/core';
import { ICountry } from '../../../interfaces/ICountry';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  country = input.required<ICountry>();
  currentYear = computed(() => {
    return new Date().getFullYear;
  })

}
