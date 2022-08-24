import { useEffect } from 'react';

import { useEmailVerification } from '@store/emailVerification';
import { useAuth } from '@store/auth';
import { usePrevious } from 'utils/hooks';
import { errorNotification, successNotification } from 'utils/notifications';

export function useVerifyUserPageHooks(): void {
  const auth = useAuth();
  const state = useEmailVerification();
  const prev = usePrevious(state);

  useEffect(() => {
    if (prev?.sendState?.loading) {
      if (state.sendState.error) {
        errorNotification('Error', state.sendState);
      } else if (!state.sendState.loading) {
        successNotification('Success', 'Code resent to your email');
      }
    }
    if (prev?.verifyState?.loading) {
      if (state.verifyState.error) {
        errorNotification('Error', state.verifyState);
      } else if (!state.verifyState.loading) {
        auth.userVerified();
        // if user verified the code successfully then this message will be shown
        successNotification('Success', 'User verified successfully');
      }
    }
  }, [state]);
}
