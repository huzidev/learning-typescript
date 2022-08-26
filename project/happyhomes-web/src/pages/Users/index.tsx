/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, Skeleton, Space, Table, Typography } from 'antd';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from '@ant-design/icons/lib/icons';

import { UserDetail } from '@store/user/types';
import { useAuth } from '@store/auth';
import { useUser } from '@store/user';

import { mapBoolColumns, onTableChange } from 'utils/table';
import { hasPermission } from 'utils';
import ROUTE_PATHS from 'Router/paths';
import { cx } from 'alias';

import Page from 'components/Page';

import { useUsersPageHooks } from './hooks';
import { columns, boolKeys } from './data';
import './styles.less';

function UsersPage(): JSX.Element {
  const history = useHistory();
  const auth = useAuth();
  const user = useUser();

  useUsersPageHooks();

  const state = user.list;
  const { idsState } = user;

  const loading = state?.loading;
  const meta = state?.meta;

  // this page will appear when admin clicked on manage users
  return (
    // fullWidth is used so all the data in the header will appear in fullWidth
    <Page header footer fullWidth>
      <div id="users-page" className={cx('g-full-page')}>
        <Col span={22} offset={1}>
          <Row justify="space-between">
            <Typography.Title level={2}>Manage Users</Typography.Title>
            <Button
              icon={<UserAddOutlined />}
              onClick={() => history.push(ROUTE_PATHS.USER_CREATE)}
            >
              Create User
            </Button>
          </Row>
          {/* means if loading is TRUE and if no data is fetched then (Skeleton) loading will be shown (Skeleton) is just a loading design */}
          {loading && !state?.data && <Skeleton paragraph={{ rows: 10 }} />}
          {!!state?.data && (
            <Space size="large">
              <Table
                loading={loading}
                dataSource={state.data}
                rowKey={(record) => record.id}
                columns={columns
                  // .concat combines two or more array
                  // here columns is an array with all the values like id, name, email, role etc and we are linking with another array of data like user update
                  .concat({
                    title: 'Action',
                    key: 'action',
                    render: (record) => {
                      if (auth.user && !hasPermission(record.role, auth.user.role)) {
                        return <div />;
                      }
                      console.log('RNEDERRRRRRRRRR', record);
                      const idLoading = idsState[record.id]?.loading;
                      const { isActive } = record; // like DESTRUCTURING so we can directly use isActive state of users
                      // record have all the data of users like id, email, isVerified etc
                      console.log('user Record', record);
                      return (
                        <Space size="middle">
                          <Button
                            loading={idLoading}
                            type="default"
                            icon={<EditOutlined />}
                            onClick={() =>
                              history.push(
                                ROUTE_PATHS.USER_UPDATE +
                                  (record.id === auth?.user?.id ? 'me' : record.id), // for admin if admin wanted to update own self then url will be like user/update/me otherwise id of that user will be in URL
                              )
                            }
                          >
                            Update
                          </Button>
                          {/* record.id is the id of that USER whom admin wanted to change or update auth.user.id is the id of loggedIn user in this case auth.user.id is the id of admin as only admin can ONLY (MANAGE USERS) and record.id !== auth?.user?.id will shows remove button for every user except for admin own self means admin can't remove own self as record.id !== auth.user.id */}
                          {/* in simple if admin id is 1 so record.id is equals to auth.user.id as both have 1 id therefore condition is false because we asked 1 !== 1 and if record.id is 2 and auth.user.id of admin is 1 now condition is true because 2 !== 1 */}
                          {record.id !== auth?.user?.id && (
                            <Button
                              type="primary"
                              loading={idLoading}
                              icon={isActive ? <DeleteOutlined /> : <CheckCircleOutlined />}
                              onClick={() =>
                                isActive
                                  ? user.removeById(record.id)
                                  : user.updateById(record.id, { isActive: true })
                              }
                            >
                              {/* so when admin wanted to Re-activate the user the isActive state will be changed to true because when admin remove any user the active state of that user will be changes to false */}
                              {isActive ? 'Remove' : 'Re activate'}
                            </Button>
                          )}
                        </Space>
                      );
                    },
                  })
                  // for the boolean values columns like isActive, isBanned, isVerified
                  .map((v) => mapBoolColumns<UserDetail>(v, boolKeys))}
                pagination={{
                  total: meta?.total,
                  // showSizeChanger is basically a small bar in which all the pages are available so user can select any page user wanted therefore we've says showSizeChanger: false
                  showSizeChanger: false,
                  pageSize: meta?.perPage, // means perPage 25 users
                  current: meta?.currentPage,
                }}
                onChange={(pagination, filters, sorter) => {
                  onTableChange(history, ROUTE_PATHS.USERS, pagination, filters, sorter);
                }}
              />
            </Space>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default UsersPage;
