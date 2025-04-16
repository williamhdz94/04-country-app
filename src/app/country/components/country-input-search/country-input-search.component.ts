import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-input-search',
  imports: [],
  templateUrl: './country-input-search.component.html',
})
export class CountryInputSearchComponent {

  valueSearch = output<string>();
  placeHolder = input<string>();
  debounceTime = input(500);

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timout = setTimeout(() => {
      this.valueSearch.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timout);
    })
  })

}
