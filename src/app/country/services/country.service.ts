import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountriesResponse } from '../interfaces/ICountriesResponse';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
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
        return throwError(() => new Error('No se encontraron resultados'))
      })
    )
  }

  searchByCountry( query: string ): Observable<ICountry[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<ICountriesResponse[]>(`${ API_URL }/name/${ query }`).pipe(
      map( ( data ) => CountryMapper.mapCountrieToCountryArray(data) ),
      // delay(3000),
      catchError( (err) =>  {
        return throwError(() => new Error('No se encontraron resultados'))
      })
    )
  }

  searchCountryByCode( code: string ) {

    return this.http.get<ICountriesResponse[]>(`${ API_URL }/alpha/${ code }`).pipe(
      map( ( data ) => CountryMapper.mapCountrieToCountryArray(data) ),
      map( countries => countries.at(0) ),
      catchError( (err) =>  {
        return throwError(() => new Error('No se encontraron resultados'))
      })
    )
  }

}
