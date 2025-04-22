import { CountryListComponent } from './../../components/country-list/country-list.component';
import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryInputSearchComponent } from '../../components/country-input-search/country-input-search.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

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
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if( !request.query ) return of([]);
      this.router.navigate(['/country/by-pais'], {
        queryParams: {
          query: request.query
        }
      })
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
