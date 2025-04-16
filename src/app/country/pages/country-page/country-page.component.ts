import { NotFoundComponent } from './../../../shared/components/not-found/not-found.component';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [
    NotFoundComponent,
    CountryInformationComponent
  ],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = signal<string>('');

  activatedRoute = inject(ActivatedRoute).queryParams.subscribe(( params ) => {
    this.countryCode.set(params['code'])
  });
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode() }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByCode(request.code)
    }
  })

}
