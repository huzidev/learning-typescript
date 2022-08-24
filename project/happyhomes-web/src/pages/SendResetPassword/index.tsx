import { Button, Form, Input, Typography } from 'antd';
import { useHistory } from 'react-router-dom';

import { ResetPasswordSendCodeRequest } from '@store/resetPassword/types';
import { useResetPassword } from '@store/resetPassword';
import { cx } from 'alias';

import PageCardContent from 'components/PageCardContent';
import Page from 'components/Page';

import { useResetPasswordPageHooks } from './hooks';
import { errors } from '../../errors';
import './styles.less';

function SendResetPasswordPage(): JSX.Element {
  const resetPassword = useResetPassword();
  const { loading } = resetPassword.sendState;
  const [form] = Form.useForm<ResetPasswordSendCodeRequest>();
  const history = useHistory();
  useResetPasswordPageHooks(form);

  const initialValues = {};
  // this is the page where user will input their email for resetPassword
  return (
    <Page header footer>
      <div id="reset-page" className={cx('g-full-page')}>
        {/* Heading for Forgot password */}
        <PageCardContent data-cy="forgot-password-header" title="Forgot password" loading={loading}>
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            // send function is created in store/resetPassword/actions.ts
            onFinish={(data) => resetPassword.send(data)}
          >
            <Form.Item
              required
              name="email"
              label="Enter your email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: errors.emailRequired,
                },
              ]}
            >
              <Input type="email" placeholder="Enter your email" data-cy="email-field" />
            </Form.Item>
            <Form.Item>
              <Typography.Text>Remembered your account ? </Typography.Text>
              <Typography.Link
                disabled={loading}
                onClick={() => history.goBack()}
                data-cy="login-cta"
              >
                Log In
              </Typography.Link>
            </Form.Item>
            <Button type="primary" loading={loading} htmlType="submit" data-cy="forgot-submit">
              Send code
            </Button>
          </Form>
        </PageCardContent>
      </div>
    </Page>
  );
}

export default SendResetPasswordPage;
