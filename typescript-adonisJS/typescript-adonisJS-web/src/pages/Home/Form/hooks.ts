import { useEffect } from 'react';

import { useAuth } from '@store/auth';
import { usePrevious } from 'utils/hooks';
import { errorNotification, successNotification } from 'utils/notifications';

function useHomeFormHook(): void {
  const auth = useAuth();
  // usePrevious will takes a parameter
  const prevAuth = usePrevious(auth);

  console.log('SIGNIN STATES');
  console.log('auth.signInState', auth.signInState);
  console.log('SIGNUP STATE');
  console.log('auth.signUpState', auth.signUpState);
  useEffect(() => {
    // for signIn state error
    if (!prevAuth?.signInState?.error && auth.signInState.error) {
      errorNotification('Failed to login', auth.signInState);
    } // for signIn state success
    else if (prevAuth?.signInState?.loading && !auth.signInState.loading) {
      successNotification('Logged in', auth.signInState?.message);
    }
    // for signUp state error
    if (!prevAuth?.signUpState?.error && auth.signUpState.error) {
      errorNotification('Failed to register', auth.signUpState);
    } // for signUp state success
    else if (prevAuth?.signUpState?.loading && !auth.signUpState.loading) {
      successNotification('User registered', auth.signUpState?.message);
    }
  }, [auth.signInState, auth.signUpState]);
}

export default useHomeFormHook;
