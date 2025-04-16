import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountriesResponse } from '../interfaces/ICountriesResponse';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { ICountry } from '../interfaces/ICountry';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, ICountry[]>();
  private queryCacheCountry = new Map<string, ICountry[]>();

  searchByCapital( query: string ): Observable<ICountry[]> {
    query = query.toLocaleLowerCase();

    if ( this.queryCacheCapital.has(query) ) {
      return of( this.queryCacheCapital.get(query) ?? [] );
    }

    console.log('Llegando al servidor por el query', query);

    return this.http.get<ICountriesResponse[]>(`${ API_URL }/capital/${ query }`).pipe(
      map( ( data ) => CountryMapper.mapCountrieToCountryArray(data) ),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError( (err) =>  {
        return throwError(() => new Error('No se encontraron resultados'))
      })
    )
  }

  searchByCountry( query: string ): Observable<ICountry[]> {
    query = query.toLocaleLowerCase();

    if ( this.queryCacheCountry.has(query) ) {
      return of( this.queryCacheCountry.get(query) ?? [] );
    }

    console.log('Llegando al servidor por el query', query);

    return this.http.get<ICountriesResponse[]>(`${ API_URL }/name/${ query }`).pipe(
      map( ( data ) => CountryMapper.mapCountrieToCountryArray(data) ),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
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
