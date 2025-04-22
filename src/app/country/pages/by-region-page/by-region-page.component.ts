import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { TRegion } from '../../../types/TRegion';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateQueryParam } from '../../../shared/helpers/validateQueryParam';

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
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<TRegion>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if( !request.region ) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      })
      return this.countryService.searchByRegion(request.region)
    }
   })

}
