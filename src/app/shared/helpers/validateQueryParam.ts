import { TRegion } from '../../types/TRegion';

export function validateQueryParam(queryParam: string): TRegion {

  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, TRegion> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  }

  return validRegions[queryParam] ?? 'Americas';

}
