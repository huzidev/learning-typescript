import { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import { useApartment } from '@store/apartment';

import { ApartmentFiltersStateHandler } from 'components/ApartmentFilters/hooks';

export function useMapViewPageHooks(
  filters: ApartmentFiltersStateHandler,
  bounds: GoogleMapReact.Bounds | null,
): void {
  const apartment = useApartment();

  useEffect(() => {
    apartment.getDefaultFilters();
  }, []);
  console.log('BOUNDS BOUNDS', bounds);
  console.log('FILTER INITS', filters.init);
  useEffect(() => {
    // filters.init will be true when user clicked on any city to check all the apartment through google map
    // bounds have all the coordinates of nw, ne, sw, se
    if (filters.init && bounds) {
      apartment.getMapList({
        ...filters.activeState,
        nw: JSON.stringify(bounds.nw),
        se: JSON.stringify(bounds.se),
      });
    }
  }, [filters.activeState, bounds]);
}
