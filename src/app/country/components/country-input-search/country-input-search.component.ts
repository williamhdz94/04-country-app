import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-input-search',
  imports: [],
  templateUrl: './country-input-search.component.html',
})
export class CountryInputSearchComponent {

  valueSearch = output<string>();
  placeHolder = input<string>();
  debounceTime = input(500);
  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

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
