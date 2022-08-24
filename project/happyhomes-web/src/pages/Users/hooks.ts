/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import qs from 'query-string';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';
import { useUser } from '@store/user';
import ROUTE_PATHS from 'Router/paths';

export function useUsersPageHooks(): void {
  const user = useUser();
  const history = useHistory();
  const params = useParams<any>();
  const state = user.list;
  const prev = usePrevious(state);

  useEffect(() => {
    // Add page no if no page is found
    if (!params.page) {
      history.replace(ROUTE_PATHS.USERS + 1);
    }
  }, []);

  useEffect(() => {
    if (params.page) {
      // this qs.parse(history.location.search) will adds the sort method in URL like if admin wanted to see all the USERS in (ascending) order then (ascending) order will be shown in URL therefore we've to pass (search) in getList
      const search = qs.parse(history.location.search);
      user.getList(params.page, search);
      user.resetIdState();
    }
  }, [params.page, history.location.search]);

  useEffect(() => {
    if (prev?.loading) {
      if (state.error) {
        errorNotification('Error', state);
      } else if (!state.loading) {
        successNotification('Success', 'Users fetched successfully');
      }
    }
  }, [state]);
}
