import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-input-search',
  imports: [],
  templateUrl: './country-input-search.component.html',
})
export class CountryInputSearchComponent {

  valueSearch = output<string>();
  placeHolder = input<string>();

  onSearch(value: string) {
    // add validations
    this.valueSearch.emit(value);
  }

}
