import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryInputSearchComponent } from '../../components/country-input-search/country-input-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { ICountry } from '../../interfaces/ICountry';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    CountryInputSearchComponent,
    CountryListComponent
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if( !request.query ) return of([]);
      return this.countryService.searchByCapital(request.query)
    }
   })

   // VERSION TEST - Resource with promises
  //  countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if ( !this.query() ) return [];

  //     return await firstValueFrom(
  //     this.countryService.searchByCapital(request.query)
  //     );
  //   }
  //  })

  // VERSION STABLE
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<ICountry[]>([]);

  // onSearch(value: string) {
  //   if( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(value).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //       console.log(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err)
  //     }
  //   })
  // }

}
