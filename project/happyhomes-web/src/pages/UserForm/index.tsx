import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Checkbox, Col, Form, Input, Row, Select, Typography, Switch } from 'antd';
import startCase from 'lodash/startCase';
import { cx } from 'alias';

import { CreateUserReq, UpdateByIdReq } from '@store/user/types';
import { roles } from '@store/auth/types';
import { useUser } from '@store/user';
import { useAuth } from '@store/auth';

import { hasPermission } from 'utils';

import Page from 'components/Page';

import { useUserFormHooks } from './hooks';
import { colProps } from './data';
import './styles.less';

function UserFormPage(): JSX.Element {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>();
  const user = useUser();
  const auth = useAuth();

  const isSetting = history.location.pathname.includes('settings/me');
  const isUpdate = history.location.pathname.includes('update'); // if anywhere in URL word UPDATE is found then isUpdate state will be changes to TRUE
  const isCreate = !isUpdate; // if isUpdate is Not true then simply isCreate will be true
  console.log(
    `is Update state is ${isUpdate} and isCreate state is ${isCreate} AND IS SETTTTINGSSS ${isSetting}`,
  );

  // for darkMode therefore mode
  const [mode, setMode] = useState(false);
  const isMe = history.location.pathname.endsWith('me'); // when admin or user is updating own self the URL will be like (user/update/me) it endsWith('me')
  const userId = isMe ? auth.user?.id : params.id;
  const profile = user.idsState[userId]; // profile helps to bring all the previous (data) of user when updating any user
  const isSameUser = isMe || auth.user?.id?.toString() === params.id; // isSame will only be true when admin OR user is updating OWN self
  console.log('Profile', profile);
  console.log('isSame user', isSameUser);

  useUserFormHooks();

  // for TOGGLE dark mode
  const onChange = (checked: boolean) => {
    console.log('test');
    setMode((prevState) => !prevState);
  };
  const appear = mode ? 'Light' : 'Dark';
  console.log('APPEARRRRR', auth.user?.isTheme);
  const onFinish = (data: UpdateByIdReq) => {
    if (isCreate) {
      user.create(data as CreateUserReq); // CreateUserReq takes name, email, password, confirm password, isVerified etc
    }
    if (isUpdate && !isMe) {
      // isUpdate && !isMe means updating any other user but NOT own self
      user.updateById(params.id, data); // therefore we've used params.id because admin will update any other user NOT own self
    } else if (isUpdate && isMe) {
      user.updateMe(data);
    }
  };

  if (isUpdate && (!profile || profile?.loading)) {
    return <div />;
  }

  const initialValues = {
    isVerified: true, // isVerified state will be true byDefault
    role: roles[0], // means byDefault OR initialValues will be client if we changes role to 2 then role will admin as a initialValue
    ...(profile?.data ?? {}), // so when admin wanted to update any user data so all the previous value will stay same therefore we've used ...(profile.data) profile have all the data of user info like name, email, role etc
  };

  const isAdmin = auth.user && hasPermission('admin', auth.user?.role);

  const loading = profile?.loading || user?.createState?.loading;

  return (
    <Page header footer>
      <div id="user-form-page" className={cx('g-full-page ', !mode ? 'Dark-mode' : 'Light-mode')}>
        <Col {...colProps}>
          {isSetting ? (
            <Card
              className={cx(!mode ? 'Dark-mode' : 'Light-mode')}
              actions={[
                <Row justify="end" className={cx(!mode ? 'Dark-mode' : 'Light-mode')}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Row>,
              ]}
              title="Preferences"
              extra={<Typography.Link onClick={() => history.goBack()}> Go back</Typography.Link>}
            >
              <Row justify="space-between">
                <Typography.Text>Current Theme is : {`${appear}`}</Typography.Text>
                <Row justify="end">
                  <Switch defaultChecked onChange={onChange} />
                </Row>
              </Row>
            </Card>
          ) : (
            <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
              <Card
                actions={[
                  // justify end so end button will be shown at the end
                  <Row justify="end">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Save
                    </Button>
                  </Row>,
                ]}
                // the heading will be Update user if admin wanted to update user or heading will be Create User if admin wanted to create new user
                title={isUpdate ? 'Update user' : 'Create User'}
                extra={<Typography.Link onClick={() => history.goBack()}>Go back</Typography.Link>}
              >
                <Form.Item
                  required={isCreate}
                  name="name"
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your name',
                    },
                    {
                      pattern: /^[a-zA-Z ]*$/, // REGEX pattern and it is mandatory to give a extra space in the end
                      message: 'Only alphabets are allowed',
                    },
                    {
                      min: 2,
                      message: 'Name should be at least 2 characters long',
                    },
                  ]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                  required={isCreate}
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please enter your email',
                    },
                  ]}
                >
                  <Input type="email" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item
                  required={isCreate}
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: isCreate,
                      message: 'Please enter your password',
                    },
                    {
                      min: 6,
                      message: 'Password should be at least 6 characters long',
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                  required={isCreate}
                  name="passwordConfirmation"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: isCreate,
                      message: 'Please re-enter your password',
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
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords that you entered do not match!'),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                {/* so during update any user CHECKBOXES of Verified, Banned and Active will be only available when ADMIN is updating any user if */}
                {isAdmin && (
                  <>
                    {/* means ADMIN can't change own self from active to notActive, isVerified to notVerified, notBanned to Banned therefore we've used !isSameUser */}
                    {!isSameUser && (
                      <Form.Item label="Select" name="role">
                        <Select>
                          {auth.user &&
                            // roles.slice(0) means START from 0th index and roles.indexOf(auth.user.role) + 1 is the end of index since index starts from 0 therefore we've to use +1 so last index will be the last role
                            // in brief .slice takes two parameters first is start of index and second parameter is end of index
                            roles.slice(0, roles.indexOf(auth.user.role) + 1).map((role) => (
                              <Select.Option key={role} value={role}>
                                {startCase(role)}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    )}
                    {/* CHECKBOX */}
                    {!isSameUser && (
                      <Form.Item
                        name="isVerified"
                        valuePropName="checked"
                        wrapperCol={{ span: 24 }}
                      >
                        <Checkbox>Verified</Checkbox>
                      </Form.Item>
                    )}
                    {/* isUpdate and !isSameUser means if admin wanted to update any other user so Banned and Active CHECKBOX will be shown but if admin wanted to update own self then these CHECKBOXES won't be shown */}
                    {isUpdate && !isSameUser && (
                      <>
                        <Form.Item
                          name="isBanned"
                          valuePropName="checked"
                          wrapperCol={{ span: 24 }}
                        >
                          <Checkbox>Banned</Checkbox>
                        </Form.Item>
                        <Form.Item name="isTheme" valuePropName="checked" wrapperCol={{ span: 24 }}>
                          <Checkbox>isTheme</Checkbox>
                        </Form.Item>
                        <Form.Item
                          name="isActive"
                          valuePropName="checked"
                          wrapperCol={{ span: 24 }}
                        >
                          <Checkbox>Active</Checkbox>
                        </Form.Item>
                      </>
                    )}
                  </>
                )}
              </Card>
            </Form>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default UserFormPage;
