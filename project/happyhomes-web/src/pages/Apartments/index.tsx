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
          {/* Skeleton is for loading therefore we've used the condition loading && !state.data means loading true and no apartment data then skeleton loading will runs */}
          {loading && !state?.data && <Skeleton paragraph={{ rows: 10 }} />}
          {!!state?.data && (
            <Space size="large">
              <Table
                loading={loading}
                dataSource={state.data}
                rowKey={(record) => record.id}
                columns={columns
                  // .concat combines two or more array
                  // here columns is an array with all the values like id, description, isACtive etc and we are linking with another array of data like apartment update
                  .concat({
                    title: 'Action',
                    key: 'action',
                    render: (record) => {
                      const idLoading = idsState[record.id]?.loading;
                      // DESTRUCTURING for isActive apartments from (APARTMENTS RECORD)
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
                  // means manage apartment are only accessible for these users with these specific roles
                  .filter(
                    (v) =>
                      auth.user?.role === 'super-admin' ||
                      auth.user?.role === 'admin' ||
                      (auth.user?.role === 'realtor' &&
                        // key have all the data like id, name, description, size etc and we've defined key already in data.ts file
                        // realtorSkipKeys will not shows isActive and realtorId when realtor is at manage apartments page and realtorSkipKeys is already defined in data.ts file
                        v.key &&
                        // we've used toString() because .includes takes string as a parameter
                        !realtorSkipKeys.includes(v.key.toString())),
                  )
                  .map((record) => {
                    // we've used toString() because .includes takes string as a parameter
                    if (record.key && ['lat', 'lng'].includes(record.key?.toString())) {
                      return {
                        ...record,
                        render: (r: number) => {
                          // substring() extracts a part of a string and we've used substring() for lat and lng only means it'll only select the number bw 0 and 5 position if we increases the number quantity then it'll show longer lat and lng values
                          return <div>{r.toString().substring(0, 5)}</div>;
                        },
                      };
                    }
                    return record;
                  })
                  // for boolean keys data like isActive if we remove this line below with mapBooleanKeys then isActive data of apartment will not shown
                  .map((v) => mapBoolColumns<ApartmentDetail>(v, boolKeys))}
                pagination={{
                  total: meta?.total, // meta?.total means overall total apartments uploaded by every realtor if loggedIn as admin and clicked on Manage Apartment and if loggedIn as realtor then all the apartments of that specific user
                  showSizeChanger: false,
                  pageSize: meta?.perPage, // means perPage 25 apartments
                  current: meta?.currentPage, // if admin or realtor clicked on next page then current page will be changed to 2 from 1 because byDefault current page is one
                }}
                onChange={(pagination, filters, sorter) => {
                  onTableChange(
                    history,
                    // as admin or realtor wanted to go to next page then it'll check the condition if realtor is loggedIn then apartmentByMe else all the apartments for admin
                    isMe ? ROUTE_PATHS.APARTMENTS_BY_ME : ROUTE_PATHS.APARTMENTS,
                    pagination,
                    // if any filters are applied then they'll remains same for next page
                    filters,
                    // if any sort method is used then they'll also remains same for next page
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
