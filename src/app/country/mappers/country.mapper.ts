import { ICountriesResponse } from "../interfaces/ICountriesResponse";
import { ICountry } from "../interfaces/ICountry";

export class CountryMapper {

    static mapCountriesToCountry( countrie: ICountriesResponse ): ICountry {
      return {
        cca2: countrie.cca2,
        flag: countrie.flag,
        flagSvg: countrie.flags.svg,
        name: countrie.translations['spa'].common ?? 'No Spanish Name',
        capital: countrie.capital?.join(','),
        population: countrie.population,
      }
    }

    static mapCountrieToCountryArray( countries: ICountriesResponse[] ): ICountry[] {
      return countries.map(this.mapCountriesToCountry);
    }

}
