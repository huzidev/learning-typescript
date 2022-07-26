/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Result } from 'antd';
import GoogleMapReact from 'google-map-react';

import { useApartment } from '@store/apartment';
import { useAuth } from '@store/auth';

import { GOOGLE_MAP_KEY } from 'configs/keys';
import ROUTE_PATHS from 'Router/paths';
import { hasPermission } from 'utils';
import { cx } from 'alias';

import ApartmentCardPlaceholders from 'components/ApartmentCard/Placeholder';
import ApartmentMarker from 'components/ApartmentMarker';
import ApartmentCard from 'components/ApartmentCard';
import Page from 'components/Page';
import { useApartmentViewHooks } from './hooks';
import './styles.less';

function ViewApartmentPage(): JSX.Element {
  const apartment = useApartment();
  const history = useHistory();
  const auth = useAuth();
  useApartmentViewHooks();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>();
  // params.id will assigned the id of that apartment to variable const apartmentId on which user have clicked
  const apartmentId = params.id;
  const state = apartment.idsState[apartmentId];

  const loading = state?.loading;

  // means if user role is client and client tries to access the apartment which is rented then this force error will be true because client will only be applicable to check available apartments
  const forceError = auth.user?.role === 'client' && state?.data?.status === 'rented';
  const isRemoved = !state?.data?.isActive && !hasPermission('admin', auth.user?.role);

  // this page will run when we clicked on any apartment to view it therefore it is called ApartmentView

  console.log('apartmentId from index.tsx', apartmentId);
  console.log('paramsId from hooks', params.id);
  console.log('WHAT IS FORCE ERRRRORR', forceError);
  console.log(`Current LoggedIn user ID is ${auth.user?.id} and name is ${auth.user?.name}`);
  return (
    <Page header footer>
      <div id="apartment-view-page" className={cx('g-full-page')}>
        <Col span={22} offset={1} xl={{ span: 16, offset: 4 }}>
          {/* if apartment is REMOVED */}
          {(!loading && state?.error) ||
            (isRemoved && (
              <Card>
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the apartment does not exist anymore."
                  extra={
                    <Button type="primary" onClick={() => history.replace(ROUTE_PATHS.DASHBOARD)}>
                      Back Home
                    </Button>
                  }
                />
              </Card>
            ))}
          {/* if client tries to access apartment which is already rented */}
          {forceError && (
            <Card>
              <Result
                // status 403 and status 404 have different images according to the status
                status="403"
                title="403"
                subTitle={`The apartment you tries to access might be Rented would you like to check more apartment from the user who've uploaded that apartment`}
                extra={
                  <>
                    <Button
                      type="primary"
                      onClick={() =>
                        history.push(`${ROUTE_PATHS.VIEW_PROFILE}${state.data?.realtorId}`)
                      }
                    >
                      Check More
                    </Button>
                    <Button type="primary" onClick={() => history.replace(ROUTE_PATHS.DASHBOARD)}>
                      Back Home
                    </Button>
                  </>
                }
              />
            </Card>
          )}
          {loading && <ApartmentCardPlaceholders count={1} />}
          {/* means no loading, state.data must be true, no force error and apartment is not REMOVED */}
          {!loading && !!state?.data && !forceError && !isRemoved && (
            <>
              {/* this ApartmentCard will shows all the data like address price per month etc */}
              <ApartmentCard // this will be pass as a props in components/apartmentCard/index.ts
                item={state.data}
                fullWidth
                onRealtorClick={() =>
                  // when this function runs in components/apartmentCard/index.ts it'll linked us to that specific path and state.data?.realtorId will adds the id of that specific realtor at the end of url
                  history.push(ROUTE_PATHS.VIEW_PROFILE + state.data?.realtorId)
                }
              />
              {console.log(`id of realtor uploaded that apartment is ${state.data?.realtorId}`)}
              <br />
              {/* this will show us google map in apartmentView page */}
              <div className={cx('map-base')}>
                <GoogleMapReact
                  defaultZoom={14}
                  bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
                  defaultCenter={{ lat: state.data.lat, lng: state.data.lng }}
                >
                  <ApartmentMarker
                    hidePopOver
                    lat={state.data.lat}
                    lng={state.data.lng}
                    // the properties here are passing as props so we can access the data like realtor Name etc this (PROP) will be received in src/components/ApartmentMarker/index.tsx
                    properties={state.data}
                  />
                </GoogleMapReact>
              </div>
            </>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default ViewApartmentPage;
