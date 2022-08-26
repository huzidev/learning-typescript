import { useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { cx } from 'alias';

import { useEmailVerification } from '@store/emailVerification';
import { useAuth } from '@store/auth';

import PageCardContent from 'components/PageCardContent';
import OTPInput from 'components/OTPInput';
import Page from 'components/Page';

import { useVerifyUserPageHooks } from './hooks';
import './styles.less';

function VerifyUserPage(): JSX.Element {
  const [otp, setOtp] = useState('');
  const emailVerification = useEmailVerification();
  const auth = useAuth();
  useVerifyUserPageHooks();

  const loading =
    emailVerification.sendState.loading ||
    emailVerification.verifyState.loading ||
    auth.signOutState.loading;

  // this page will run when user is at verification page after creating account
  return (
    <Page header footer>
      <div id="verify-page" className={cx('g-full-page')}>
        <PageCardContent
          align="center"
          loading={loading}
          title="Verify User"
          action={auth.signOut}
          actionLabel="Log Out"
        >
          <Typography.Text className={cx('description')}>
            Please enter the verification code we sent to your email{' '}
            {/* auth.user?.email for user's email who wanted to verify */}
            <span className={cx('highlight')}>{auth.user?.email}</span>
          </Typography.Text>
          <OTPInput value={otp} onChange={setOtp} />
          <Row>
            <Typography.Text type="secondary">Did not receive the code ?</Typography.Text>
            {/* (send) is a function created in store/emailVerification/actions.ts to generate random code for emailVerification */}
            <Typography.Link disabled={loading} onClick={() => emailVerification.send()}>
              Resend
            </Typography.Link>
          </Row>
          <Button
            type="primary"
            loading={loading}
            disabled={otp.length !== 6}
            // (verify) is a function created in store/emailVerification/actions.ts to (VERIFY) random code for emailVerification and verify function takes a parameter which verificationCode
            onClick={() => emailVerification.verify({ code: otp })}
          >
            Verify
          </Button>
        </PageCardContent>
      </div>
    </Page>
  );
}

export default VerifyUserPage;
