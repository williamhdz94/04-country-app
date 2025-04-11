import { CountryListComponent } from './../../components/country-list/country-list.component';
import { Component, inject, resource, signal } from '@angular/core';
import { CountryInputSearchComponent } from '../../components/country-input-search/country-input-search.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [
    CountryInputSearchComponent,
    CountryListComponent
  ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if( !request.query ) return of([]);
      return this.countryService.searchByCountry(request.query)
    }
   })

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if ( !this.query() ) return [];

  //     return await firstValueFrom(
  //     this.countryService.searchByCountry(request.query)
  //     );
  //   }
  //  })

}
