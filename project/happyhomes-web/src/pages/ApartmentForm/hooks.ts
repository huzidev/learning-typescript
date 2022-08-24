import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// ApartmentIDSubState have all the interface/type for apartment details like id=number, name=string
import { ApartmentIDSubState } from '@store/apartment/types';

// so we can access the apartment details like apartment id, name etc
import { useApartment } from '@store/apartment';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';

export function useApartmentFormHooks(): void {
  const apartment = useApartment();
  const history = useHistory();

  // isUpdate will be true when pathname includes '/update'
  const isUpdate = history.location.pathname.includes('/update');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>();
  const apartmentId: number = params.id;

  // means if realtor or admin clicked on Update then it'll link them to apartment.idsState[params.id] other wise it'll link them to apartment.createState
  const state: ApartmentIDSubState = isUpdate
    ? apartment.idsState[params.id]
    : apartment.createState;
  const prev = usePrevious(state);

  useEffect(() => {
    apartment.getDefaultFilters();
    // if user clicked on Update then get apartment id
    if (isUpdate) {
      apartment.getById(apartmentId);
    }
  }, []);
  useEffect(() => {
    // state.action !== get means when user update apartment the type will be UPDATE hence !== get
    if (prev?.loading && !state.loading && state.action !== 'get') {
      if (!state.error) {
        successNotification(
          'Success',
          isUpdate ? 'Apartment updated successfully' : 'Apartment created successfully',
        );
        // after creating or updating apartment it'll link user to 1 step back
        history.goBack();
      } else if (state.error) {
        errorNotification('Error', state);
      }
    }
  }, [state]);
}
