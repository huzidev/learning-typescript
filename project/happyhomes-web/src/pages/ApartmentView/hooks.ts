import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useApartment } from '@store/apartment';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';
import { ParamsId } from 'types/route';

export function useApartmentViewHooks(): void {
  const apartment = useApartment();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>() as ParamsId;
  const apartmentId = params.id; // will gets the apartment id on which user have clicked
  const state = apartment.idsState[apartmentId]; // idState will take a [id] therefore we've put [apartmentId]
  const prev = usePrevious(state);

  useEffect(() => {
    apartment.getById(apartmentId);
  }, []);

  console.log('apartment Id from hooks', apartmentId);
  useEffect(() => {
    if (prev?.loading) {
      if (state.error) {
        // if error then it'll notification of error
        errorNotification('Error', state);
      } else if (!state.loading) {
        // if success then it'll show notification of success
        successNotification('Success', 'Apartment fetched successfully');
      }
    }
  }, [state]);
}
