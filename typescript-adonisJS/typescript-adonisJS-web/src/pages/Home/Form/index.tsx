import { useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { cx } from 'alias';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';

import { errors } from 'errors';
import responsive from '../responsive';
import useHomeFormHook from './hooks';
import './styles.less';

function HomeForm(): JSX.Element {
  const [isLogInForm, setIsLogInForm] = useState(true);
  const history = useHistory();
  const auth = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (data: any) => {
    // if user is at loginIn page then onFinish data will be sends to singIn page
    if (isLogInForm) {
      auth.signIn(data);
    } // if user is at signUp page then onFinish data will be sends to signUp page
    else {
      auth.signUp(data);
    }
  };

  useHomeFormHook();

  const title = isLogInForm ? 'Log In' : 'Register';
  // if user is in signUp page then already Have an account ?login will be print if and if user is in signIn page then Don't have an account ?Register will be print
  const titleReverse = isLogInForm ? 'Register' : 'Log In';
  // descReverse will be Don't have an account ? if user is in logIn page and Already have an account ? if user is in signUp page
  const descReverse = isLogInForm ? "Don't have an account ?" : 'Already have an account ?';

  const initialValues = {};

  const { loading } = isLogInForm ? auth.signInState : auth.signUpState;

  return (
    <div className={cx('home-form-base')}>
      <Col className={cx('home-form')} {...responsive.form}>
        <Card title={title} data-cy="auth-card-header">
          <Form key={title} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
            {/* if not on LogInForm then user will be at SignUp page */}
            {!isLogInForm && (
              <Form.Item
                required
                name="name"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name', // this message will be shown below input tag
                  },
                  {
                    pattern: /^[a-zA-Z ]*$/, // this is called REGEX and it is mandatory to give a extra space in the end
                    message: 'Only alphabets are allowed',
                  },
                  {
                    min: 2,
                    message: 'Name should be at least 2 characters long',
                  },
                ]}
              >
                <Input placeholder="Enter your name" data-cy="fullname-field" />
              </Form.Item>
            )}
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
              <Input type="email" placeholder="Enter your email" data-cy="email-field" />
            </Form.Item>
            {/* For Password and this is same for logIn page and signUp page */}
            <Form.Item
              required
              name="password"
              label="Password"
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
              <Input.Password placeholder="Enter your password" data-cy="password-field" />
            </Form.Item>
            {/* FOR PASSWORD CONFIRMATION only available when user isn't in logIn page */}
            {!isLogInForm && (
              <>
                <Form.Item
                  required
                  name="passwordConfirmation"
                  label="Confirm Password"
                  // dependencies will be add when we wanted to create confirmPassword and dependencies will be add in input tag of confirm password and it depends upon password therefore it's written like dependencies={['password']}
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please re-enter your password', // for password confirmation
                    },

                    {
                      min: 6,
                      message: 'Password should be at least 6 characters long',
                    },
                    // getFieldValue is used to compare password with (confirm password value) it is a builtin function
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        // !value means if user didn't enter any value in confirm password
                        if (!value || getFieldValue('password') === value) {
                          // value is the value of confirm password getFieldValue('password') matches the password with the (VALUE) of confirm password if they matches then return Promise.resolve()
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          // if password doesn't matches then this error will be shown
                          new Error('The two passwords that you entered do not match!'),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm yours password"
                    data-cy="confirm-password-field"
                  />
                </Form.Item>
                {/* checkbox if signingUp as realtor */}
                <Form.Item name="isRealtor" valuePropName="checked">
                  <Checkbox>Sign up as realtor</Checkbox>
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Row justify="space-between">
                <span>
                  {/* descReverse will be Don't have an account ? if user is in logIn page and Already have an account ? if user is in signUp page */}
                  <Typography.Text>{descReverse}</Typography.Text>
                  <Typography.Link
                    data-cy="register-cta"
                    disabled={loading}
                    onClick={() => setIsLogInForm((state) => !state)} // isLogInForm is byDefault true but onClick it'll be false and sends the user into signUp page
                  >
                    {/* if user is in signUp page then already Have an account ?login will be print if and if user is in signIn page then Don't have an account ?Register will be print */}
                    {titleReverse}
                  </Typography.Link>
                </span>
                {/* forgot password when user is in logIn page */}
                {isLogInForm && (
                  <Typography.Link
                    disabled={loading}
                    // will link user to forget password page
                    onClick={() => history.push(ROUTE_PATHS.SEND_RESET_PASSWORD)}
                    data-cy="forgot-password-page-cta"
                  >
                    Forgot password
                  </Typography.Link>
                )}
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} data-cy="auth-submit">
                {/* title will be either log in or register depends on the state of the user */}
                {title}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default HomeForm;
