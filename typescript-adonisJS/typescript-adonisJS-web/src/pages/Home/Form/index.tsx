import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { cx } from 'alias';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';

import { errors } from 'errors';
import responsive from '../responsive';
import useHomeFormHook from './hooks';
import './styles.less';

export default function HomeForm(): JSX.Element {
    const [isLogInForm, setIsLogInForm] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();

    const onFinish = (data: any) => {
        // if user is at loginIn page then data will be sends to singIn page
        if (isLogInForm) {
            auth.signIn(data);
        } // if user is at signUp page then data will be sends to signUp page
        else {
            auth.signUp(data);
        }
    };

    useHomeFormHook();

    const title = isLogInForm ? 'Log In' : 'Register';
    const titleReverse = isLogInForm ? 'Register' : 'Log In';
    const descReverse = isLogInForm ? "Don't have an account ?" : 'Already have an account ?';

    // const initialValues = {};

    // use { loading } instead of just loading
    const { loading } = isLogInForm ? auth.signInState : auth.signUpState;

    return(
        <div className={cx('home-form-base')}>
            <Col {...responsive.form}>
                <Card title={title} data-cy="auth-card-header">
                    <Form key={title} layout="vertical" onFinish={onFinish} initialValues={{}}>
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
                        {!isLogInForm && (
                            <>
                                <Form.Item
                                    required
                                    name="passwordConfirmation"
                                    label="Confirm Password"
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
                                    <Input.Password
                                        placeholder="Confirm yours password"
                                        data-cy="confirm-password-field"
                                    />
                                </Form.Item>
                                    <Form.Item name="isRealtor" valuePropName="checked">
                                    <Checkbox>Sign up as realtor</Checkbox>
                                </Form.Item>
                            </>
                        )}
                        <Form.Item>
                            <Row justify="space-between">
                                <span>
                                <Typography.Text>{descReverse}</Typography.Text>
                                <Typography.Link
                                    data-cy="register-cta"
                                    disabled={loading}
                                    onClick={() => setIsLogInForm((state) => !state)}
                                >
                                    {titleReverse}
                                </Typography.Link>
                                </span>
                                {isLogInForm && (
                                <Typography.Link
                                    disabled={loading}
                                    onClick={() => navigate(ROUTE_PATHS.SEND_RESET_PASSWORD)}
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
    )
}