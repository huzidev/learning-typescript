import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useUser } from '@store/user';
import { useAuth } from '@store/auth';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';
import { UserIDSubState } from '@store/user/types';

export function useUserFormHooks(): void {
  const auth = useAuth();
  const history = useHistory();
  const user = useUser();
  const isUpdate = history.location.pathname.includes('update');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>();
  let userId: number = params.id;
  const isMe = history.location.pathname.endsWith('update/me');
  console.log(`Form HOOOOKS isUpdate is ${isUpdate} and isME ME is ${isMe}`);
  // eslint-disable-next-line no-nested-ternary
  const state: UserIDSubState = isUpdate // userIDsubState is just type already defined in store/user/types which defines types like data: userDetails, action?: ActionType
    ? isMe // means if isUpdate and isMe both are true then then user.meState as UserIDSubState where types are already defined
      ? (user.meState as UserIDSubState)
      : user.idsState[params.id] // if isMe is false and admin is updating some other user then simple params.id for that user
    : user.createState; // when admin wanted to create newUser instead of updating user
  const prev = usePrevious(state);
  console.log('user.meState', user.meState);
  console.log('user.idState[params.id]', user.idsState[params.id]);
  console.log('user.createState', user.createState);
  // if admin clicked on own self for updating
  if (isMe && auth.user) {
    // it mandatory to use auth.user in condition
    userId = auth.user?.id;
  }
  useEffect(() => {
    user.getById(userId);
  }, []);

  useEffect(() => {
    if (prev?.loading && !state.loading && state.action !== 'get') {
      // state.action !== 'get' is necessary when admin wanted to update any other user and after updating the user state.action will be equals to (update) therefore we've write state.action !== 'get'
      if (!state.error) {
        successNotification(
          // successNotification takes two parameters first is message and second is description
          'Success', // this is message
          isUpdate ? 'User updated successfully' : 'User created successfully', // this is description related to the message
        );
        // after updating or creating user history.goBack() will takes admin backs to manage user page
        history.goBack();
      } else if (state.error) {
        errorNotification('Error', state);
      }
    }
  }, [state]);
}
