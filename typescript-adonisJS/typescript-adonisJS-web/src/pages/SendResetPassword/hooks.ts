import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormInstance } from 'antd';
import qs from 'query-string';

import { errorNotification, successNotification } from 'utils/notifications';
import { usePrevious } from 'utils/hooks';

import { ResetPasswordSendCodeRequest } from '@store/resetPassword/types';
import { useResetPassword } from '@store/resetPassword';

import ROUTE_PATHS from 'Router/paths';

export function useResetPasswordPageHooks(form: FormInstance<ResetPasswordSendCodeRequest>): void {
  const state = useResetPassword();
  const prev = usePrevious(state);
  const history = useHistory();

  useEffect(() => {
    if (prev?.sendState?.loading) {
      if (state.sendState.error) {
        errorNotification('Error', state.sendState);
      } // this will send the user to reset_password page and search: qs (query string) will adds the email into the querystring therefore we've used .getFieldsValue()
      else if (!state.sendState.loading) {
        history.push({
          pathname: ROUTE_PATHS.RESET_PASSWORD,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          search: qs.stringify(form.getFieldsValue() as any),
        });
        successNotification('Success', 'Password resend code sent to your email');
      }
    }
  }, [state]);
}
