/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import qs from 'query-string';

import { useApartment } from '@store/apartment';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';
import ROUTE_PATHS from 'Router/paths';

export function useApartmentsPageHooks(): void {
  const apartment = useApartment();
  const history = useHistory();
  const params = useParams<any>();
  // when realtor clicked on manage apartments it'll link it to apartments uploaded by realtor and URL will be like apartment/list/me/1 here (/me/) is in the URL
  const isMe = history.location.pathname.includes('/me/');
  const state = isMe ? apartment.myListState : apartment.listState; // .myListState nad .listSate both are defined in store/apartment/actions
  const prev = usePrevious(state);

  // useEffect(() => {
  //   // Add page no by + 1 if (no page is found)
  //   if (!params.page) {
  //     history.replace((isMe ? ROUTE_PATHS.APARTMENTS_BY_ME : ROUTE_PATHS.APARTMENTS) + 1);
  //     console.log('WILL THIS RUNSSSSSSS');
  //   }
  // }, []);

  console.log('WHAT IS PARAMSSSS.page', params.page);
  useEffect(() => {
    // this qs.parse(history.location.search) will adds the sort method in URL like if REALTOR wanted to see all the apartment in (ascending) order then (ascending) order will be shown in URL therefore we've to pass (search) in getMyList and getList
    const search = qs.parse(history.location.search);
    // will fetched the apartmentList from the page (MANAGE APARTMENTS) for realtor who uploaded all that apartments
    if (isMe) {
      apartment.getMyList(params.page, search);
      apartment.resetIdState();
      console.log('SEARCH SERCHH', search);
    } // means if admin wanted to check apartments then admin will get the complete list of apartments
    else if (params.page) {
      apartment.getList(params.page, search);
      apartment.resetIdState();
    }
  }, [params.page, history.location.search]);

  useEffect(() => {
    if (prev?.loading) {
      if (state.error) {
        errorNotification('Error', state);
      } else if (!state.loading) {
        successNotification('Success', 'Apartments fetched successfully'); // success is message or type and apartments fetched successfully is description related to the message type
        // successNotification takes 2 parameters and we've defined that in notification.ts first is message type and second is description
      }
    }
  }, [state]);
}
