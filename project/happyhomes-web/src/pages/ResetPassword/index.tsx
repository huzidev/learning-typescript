import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import qs from 'query-string';

import ROUTE_PATHS from 'Router/paths';
import { cx } from 'alias';

import { ResetPasswordRequest } from '@store/resetPassword/types';
import { useResetPassword } from '@store/resetPassword';

import PageCardContent from 'components/PageCardContent';
import OTPInput from 'components/OTPInput';
import Page from 'components/Page';
import { errors } from '../../errors';

import { useResetPasswordPageHooks } from './hooks';
import './styles.less';

function SendResetPasswordPage(): JSX.Element {
  const resetPassword = useResetPassword();
  const [otp, setOtp] = useState('');
  // setOtpTouch will be true when user enter the code in all 6 blocks of OTP
  const [otpTouch, setOtpTouch] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm<ResetPasswordRequest>();
  // isOtpInvalid will be true until user didn't enter all 6 code therefore here we've says !== 6
  // as all 6 blocks of otp are full then isOtpInvalid will be false
  const isOtpInvalid = otp.length !== 6;

  const { loading } = resetPassword.resetState;
  const { search } = history.location;

  console.log('WHTA IS OTP LENTGTH', otp.length);
  console.log('WHTA IS !OTP LENTGTH', !otp.length);
  console.log('WHTA IS OTP valid', isOtpInvalid);
  console.log('WHTA IS OTP touch', otpTouch);
  useResetPasswordPageHooks();
  useEffect(() => {
    if (!search) {
      history.replace(ROUTE_PATHS.SEND_RESET_PASSWORD);
    }
  }, []);

  const params = {
    ...qs.parse(search),
    password: '',
    passwordConfirmation: '',
  };
  console.log('params params', params);
  console.log('form form', [form]);
  console.log('resetPassword', resetPassword);
  return (
    <Page header footer>
      <div id="send-reset-page" className={cx('g-full-page')}>
        <PageCardContent title="Reset password" loading={loading}>
          <Form
            form={form}
            layout="vertical"
            initialValues={params}
            // onFinishFailed means when user didn't complete the 6 blocks of otp
            onFinishFailed={() => {
              // !otp.length means when blocks for otp are completely empty
              if (!otp.length) {
                setOtpTouch(true);
              }
            }}
            // onFinish when user completed the 6 blocks of otp
            onFinish={(data) => {
              // !otp.length means when blocks for otp are completely empty
              if (isOtpInvalid || !otp.length) {
                setOtpTouch(true);
                return;
              }
              // after user enter verification code and save new password this function will run
              resetPassword.reset({ ...data, code: otp });
            }}
          >
            <Form.Item
              required
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: errors.emailRequired,
                },
              ]}
            >
              {/* this disabled property wont't allow user to change the email and if user tries to change the email it'll shows the restriction */}
              <Input type="email" placeholder="Enter your email" disabled />
            </Form.Item>
            <Form.Item
              required
              name="Password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: errors.passwordRequired,
                },
                {
                  min: 6,
                  message: 'Password should be at least 6 characters long',
                },
              ]}
            >
              <Input.Password placeholder="Enter new password" data-cy="reset-password-field" />
            </Form.Item>
            <Form.Item
              required
              name="passwordConfirmation"
              label="Confirm New Password"
              // dependencies will be add when we wanted to create confirmPassword and dependencies will be add in input tag of confirm password and it depends upon password therefore it's written like dependencies={['password']}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please re-enter your new password',
                },

                {
                  min: 6,
                  message: 'Password should be at least 6 characters long',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" data-cy="creset-password-field" />
            </Form.Item>
            <Form.Item label="Verification code" className={cx('form-item-code')} required>
              <OTPInput
                value={otp}
                onChange={setOtp}
                onBlur={() => setOtpTouch(true)}
                onFocus={() => setOtpTouch(false)}
                error={otpTouch && isOtpInvalid}
              />
            </Form.Item>
            <Form.Item>
              <Typography.Text>Remembered your account ? </Typography.Text>
              {/* history.go(-2) is used because when user clicked on forget password from login page it's +1 and after inserting email user will be link to verification page hence +2 so for getting back to login page simply -2 */}
              <Typography.Link disabled={loading} onClick={() => history.go(-2)}>
                Log In
              </Typography.Link>
            </Form.Item>

            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className={cx('reset-button')}
              data-cy="reset-submit"
            >
              Save Password
            </Button>
          </Form>
        </PageCardContent>
      </div>
    </Page>
  );
}

export default SendResetPasswordPage;
