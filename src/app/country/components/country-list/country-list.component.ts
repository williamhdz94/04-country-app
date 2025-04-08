import { Component, input } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {

  countries = input.required<ICountry[]>();

}
