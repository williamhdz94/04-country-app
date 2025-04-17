import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { TRegion } from '../../../types/TRegion';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [
    CountryListComponent
  ],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: TRegion[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);
  region = signal<TRegion | null>(null);

  countryResource = rxResource({
    request: () => ({ region: this.region() }),
    loader: ({ request }) => {
      if( !request.region ) return of([]);
      return this.countryService.searchByRegion(request.region)
    }
   })

}
