import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useApartment } from '@store/apartment';
import { useUser } from '@store/user';
import { useAuth } from '@store/auth';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';
import ROUTE_PATHS from 'Router/paths';
import { hasPermission } from 'utils';

export function useViewProfileHooks(): void {
  const user = useUser();
  const auth = useAuth();
  const history = useHistory();
  const apartment = useApartment();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>();
  const isMe = params.id === auth.user?.id;
  const userId = isMe ? auth.user?.id : params.id;
  const state = user.idsState[userId];
  const prev = usePrevious(state);

  useEffect(() => {
    user.getById(userId);
    if (!isMe && auth.user?.id.toString() === params.id.toString()) {
      history.replace(`${ROUTE_PATHS.VIEW_PROFILE}${userId}`);
      console.log('id id id', userId);
    }
  }, []);

  useEffect(() => {
    if (prev?.loading) {
      if (state.error) {
        errorNotification('Error', state);
      } else if (!state.loading && state.data) {
        if (hasPermission('client', auth.user?.role)) {
          // permission for client so all the others role like realtor, admin, super-admin will gets the permission automatically because admin and realtor roles are greater than the role of client
          apartment.getListByUserID(userId, 1);
          console.log('newid newid newid', userId);
        }
        successNotification('Success', 'Profile fetched successfully');
      }
    }
  }, [state]);
}
