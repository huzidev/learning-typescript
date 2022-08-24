/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, Skeleton, Space, Table, Typography } from 'antd';
import {
  AppstoreAddOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons/lib/icons';

import { ApartmentDetail } from '@store/apartment/types';
import { useApartment } from '@store/apartment';
import { useAuth } from '@store/auth';

import { mapBoolColumns, onTableChange } from 'utils/table';
import ROUTE_PATHS from 'Router/paths';
import { cx } from 'alias';

import Page from 'components/Page';

import { columns, boolKeys, realtorSkipKeys } from './data';
import { useApartmentsPageHooks } from './hooks';
import './styles.less';

function ApartmentsPage(): JSX.Element {
  const history = useHistory();
  const auth = useAuth();
  const apartment = useApartment();

  useApartmentsPageHooks();

  const isMe = history.location.pathname.includes('/me/');
  const state = isMe ? apartment.myListState : apartment.listState; // apartment.myListState will show all the apartments of specific realtor and apartment.listState will show all apartments uploaded by all realtor
  // DESTRUCTURING
  const { idsState } = apartment;

  const loading = state?.loading;
  const meta = state?.meta;

  return (
    <Page header footer fullWidth>
      <div id="apartments-page" className={cx('g-full-page')}>
        <Col span={22} offset={1}>
          <Row justify="space-between">
            <Typography.Title level={2}>
              {/* isMe will be true when realtor was loggedIn */}
              {isMe ? 'Manage your apartments' : 'Manage Apartment'}
            </Typography.Title>
            <Button
              icon={<AppstoreAddOutlined />}
              onClick={() => history.push(ROUTE_PATHS.APARTMENT_CREATE)}
            >
              Create Apartment
            </Button>
          </Row>
          {loading && !state?.data && <Skeleton paragraph={{ rows: 10 }} />}
          {!!state?.data && (
            <Space size="large">
              <Table
                loading={loading}
                dataSource={state.data}
                rowKey={(record) => record.id}
                columns={columns
                  .concat({
                    title: 'Action',
                    key: 'action',
                    render: (record) => {
                      const idLoading = idsState[record.id]?.loading;
                      // DESTRUCTURING
                      const { isActive } = record;
                      return (
                        <Space size="middle">
                          <Button
                            loading={idLoading}
                            type="default"
                            icon={<EditOutlined />}
                            // record.id is the id of that specific apartment which user wanted to update
                            onClick={() => history.push(ROUTE_PATHS.APARTMENT_UPDATE + record.id)}
                          >
                            Update
                          </Button>
                          {/* this button is for removing apartment onClick it'll remove or re-activate the apartment on the basis of isActive state */}
                          <Button
                            type="primary"
                            loading={idLoading}
                            icon={isActive ? <DeleteOutlined /> : <CheckCircleOutlined />}
                            onClick={() =>
                              isActive
                                ? apartment.removeById(record.id)
                                : apartment.updateById(record.id, { isActive: true })
                            }
                          >
                            {isActive ? 'Remove' : 'Re activate'}
                          </Button>
                        </Space>
                      );
                    },
                  })
                  .filter(
                    (v) =>
                      auth.user?.role === 'super-admin' ||
                      auth.user?.role === 'admin' ||
                      (auth.user?.role === 'realtor' &&
                        v.key &&
                        !realtorSkipKeys.includes(v.key.toString())),
                  )
                  .map((record) => {
                    if (record.key && ['lat', 'lng'].includes(record.key?.toString())) {
                      return {
                        ...record,
                        render: (r: number) => {
                          return <div>{r.toString().substring(0, 5)}</div>;
                        },
                      };
                    }
                    return record;
                  })
                  .map((v) => mapBoolColumns<ApartmentDetail>(v, boolKeys))}
                pagination={{
                  total: meta?.total,
                  showSizeChanger: false,
                  pageSize: meta?.perPage,
                  current: meta?.currentPage,
                }}
                onChange={(pagination, filters, sorter) => {
                  onTableChange(
                    history,
                    isMe ? ROUTE_PATHS.APARTMENTS_BY_ME : ROUTE_PATHS.APARTMENTS,
                    pagination,
                    filters,
                    sorter,
                  );
                }}
              />
            </Space>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default ApartmentsPage;
