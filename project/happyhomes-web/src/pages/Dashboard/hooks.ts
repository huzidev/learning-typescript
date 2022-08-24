import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useApartment } from '@store/apartment';

import { ApartmentFiltersStateHandler } from 'components/ApartmentFilters/hooks';

export function useDashboardPageHooks(filters: ApartmentFiltersStateHandler): void {
  const apartment = useApartment();
  const history = useHistory();

  useEffect(() => {
    apartment.getDefaultFilters(); // the default filters like minRoom = 1 maxRooms = 10 will be used automatically
  }, []);

  useEffect(() => {
    if (filters.init) {
      // when user is at home page then first page of the getPublicList apartments will be load if we change the page from 1 to any other number then that specific page will be load at home page
      apartment.getPublicList(1, filters.activeState);
    }
  }, [history.location.search, filters.activeState]);
}
