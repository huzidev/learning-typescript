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

  useEffect(() => {
    if (filters.init && bounds) {
      apartment.getMapList({
        ...filters.activeState,
        nw: JSON.stringify(bounds.nw),
        se: JSON.stringify(bounds.se),
      });
    }
  }, [filters.activeState, bounds]);
}
