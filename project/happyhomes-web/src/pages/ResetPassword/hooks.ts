import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';

import { useResetPassword } from '@store/resetPassword';

export function useResetPasswordPageHooks(): void {
  const state = useResetPassword();
  const prev = usePrevious(state);
  const history = useHistory();

  useEffect(() => {
    if (prev?.resetState?.loading) {
      if (state.resetState.error) {
        errorNotification('Error', state.resetState);
      } else if (!state.resetState.loading) {
        history.go(-2);
        successNotification('Success', 'Password reset successfully');
      }
    }
  }, [state]);
}
