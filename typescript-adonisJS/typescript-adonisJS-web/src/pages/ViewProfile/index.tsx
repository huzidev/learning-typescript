/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Grid, Result, Row, Skeleton, Space, Typography, Spin } from 'antd';

import { useApartment } from '@store/apartment';
import { useAuth } from '@store/auth';
import { useUser } from '@store/user';

import ROUTE_PATHS from 'Router/paths';
import { hasPermission } from 'utils';
import { cx } from 'alias';

import ApartmentCardPlaceholders from 'components/ApartmentCard/Placeholder';
import { APARTMENT_CARD } from 'components/ApartmentCard/data';
import ApartmentCard from 'components/ApartmentCard';
import Avatar from 'components/Avatar';
import Page from 'components/Page';

import { useViewProfileHooks } from './hooks';
import './styles.less';

function ViewProfilePage(): JSX.Element {
  const { sm } = Grid.useBreakpoint();
  const history = useHistory();
  const auth = useAuth();
  const user = useUser();
  useViewProfileHooks();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>();
  const isMe = params.id === auth.user?.id; // isMe is for matching id if realtor clicked on the user name of it's own then isMe will be true
  const userId = isMe ? auth.user?.id : params.id; // auth.user?.id have the id of loggedIn user and params.Id have id of realtor on which user clicked
  const state = user.idsState[userId]; // state have action type like action="get" and user's data according to ID like is_active, is_verified, email, name and loading state and error state
  const apartments = useApartment().listByUserIDState[userId];
  const apartment = useApartment();

  const loading = state?.loading;

  console.log('VIEW PROFILE PAGE');
  console.log('apartments in VIEW PROFILE PAGE', apartments);
  console.log('userId state in VIEW PROFILE PAGE', state);
  // this page will load when user clicked on realtor name then all the apartment uploaded by user will appear at this page

  return (
    <Page header footer>
      <div id="view-profile-page" className={cx('g-full-page')}>
        <Col span={22} offset={1} xl={{ span: 16, offset: 4 }}>
          <Card className="profile-card">
            {!loading && state?.error && (
              // by default state.error is false until catches an error and and loading state is false since after loading data will be fetched but when state.error is true it'll show us this error BACK HOME
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the user does not exist."
                extra={
                  <Button type="primary" onClick={() => history.replace(ROUTE_PATHS.DASHBOARD)}>
                    Back Home
                  </Button>
                }
              />
            )}
            {loading && <Skeleton avatar paragraph={{ rows: 1 }} />}
            {!loading && !!state?.data && (
              // horizontal direction means avatar and user-data like user-name, role, email will be like in a FLEX MANNER when we create display flex like side by side when is mobile screen it'll be vertical manner like flex-direction column
              <Space size="large" direction={!sm ? 'vertical' : 'horizontal'}>
                {/* for size !sm means if (is not small screen) */}
                <Avatar user={state.data} size={!sm ? 100 : 80} />
                <Col>
                  {/* for the name of realtor */}
                  <Typography.Title level={3}>{state.data.name} </Typography.Title>
                  <Typography.Title level={5} type="secondary">
                    {state.data.role}
                  </Typography.Title>
                  <Typography.Title level={5}>{state.data.email}</Typography.Title>
                </Col>
              </Space>
            )}
          </Card>
          <br />
          {!isMe && hasPermission('realtor', state?.data?.role) && (
            <Col>
              <Typography.Title level={4}>Apartments by {state?.data?.name}</Typography.Title>
              <br />
              {console.log('isME isME ismE', isMe)}
              {console.log('what is auth.user.id', auth.user?.id)}
              {console.log('what is Realtor ID', params.id)}
              {apartments?.loading && !apartments.data?.length && (
                <ApartmentCardPlaceholders count={6} />
              )}
              {console.log('APARTMENTS LENTGH', apartments?.loading && apartments.data?.length)}
              {/* if realtor didn't uploaded any apartment then it'll show You have not uploaded any apartments yet! */}
              {apartments?.data && apartments.data?.length === 0 ? (
                <Typography.Title level={2}>
                  You have not uploaded any apartments yet!
                </Typography.Title>
              ) : (
                !!apartments?.data?.length && (
                  <Col>
                    <Row {...APARTMENT_CARD.ROW}>
                      {apartments.data.map((item) => (
                        // apartments.data have all the information about all the apartments therefore we've used mapping on apartments.data
                        <ApartmentCard
                          item={item}
                          key={item.id.toString()}
                          onClick={(id) => history.push(ROUTE_PATHS.APARTMENT_VIEW + id)}
                        />
                      ))}
                    </Row>
                    {apartments.loading && apartments.data?.length && (
                      <Col span={24} style={{ marginTop: '16px' }}>
                        <Spin />
                      </Col>
                    )}
                    {apartments.meta && apartments.meta?.currentPage < apartments.meta?.lastPage && (
                      <Button
                        type="primary"
                        loading={apartments.loading}
                        style={{ marginTop: '7px' }}
                        onClick={() =>
                          apartments.meta &&
                          apartment.getListByUserID(userId, apartments.meta.currentPage + 1)
                        }
                      >
                        Load more
                      </Button>
                    )}
                  </Col>
                )
              )}
            </Col>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default ViewProfilePage;
