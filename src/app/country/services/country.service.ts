import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountriesResponse } from '../interfaces/ICountriesResponse';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { ICountry } from '../interfaces/ICountry';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<ICountry[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<ICountriesResponse[]>(`${ API_URL }/capital/${ query }`).pipe(
      map( ( data ) => CountryMapper.mapCountrieToCountryArray(data) ),
      catchError( (err) =>  {
        console.log(err);
        return throwError(() => new Error('No se encontraron resultados'))
      })
    )
  }

}
