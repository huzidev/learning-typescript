import { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { Col, Row } from 'antd';

import { useApartment } from '@store/apartment';

import { GOOGLE_MAP_KEY } from 'configs/keys';
import { cx } from 'alias';

import useApartmentFiltersState from 'components/ApartmentFilters/hooks';
import { APARTMENT_CARD } from 'components/ApartmentCard/data';
import ApartmentFilters from 'components/ApartmentFilters';
import ApartmentMarker from 'components/ApartmentMarker';
import CityPicker from 'components/CityPicker';
import Page from 'components/Page';

import { useMapViewPageHooks } from './hooks';
import './styles.less';

function MapViewPage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>();
  // by default zoom in px
  const [zoom, setZoom] = useState(10);
  const [initialData, setInitialData] = useState<GoogleMapReact.Props | null>(null);
  const [bounds, setBounds] = useState<GoogleMapReact.Bounds | null>(null);
  const apartment = useApartment();

  console.log('ZOOMS ZOOMS', zoom);

  const state = apartment.mapListState;
  const { defaultFilters } = apartment;
  const filtersState = useApartmentFiltersState(
    defaultFilters.data,
    apartment.mapListState.filters,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const points: any = state.data?.map((val) => ({
    type: 'point',
    properties: { cluster: false, ...val },
    geometry: { type: 'Point', coordinates: [val.lng, val.lat] },
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { clusters, supercluster } = useSupercluster<any, any>({
    zoom,
    points,
    bounds: [bounds?.nw.lng ?? 0, bounds?.se.lat ?? 0, bounds?.se.lng ?? 0, bounds?.nw.lat ?? 0], // ?? is called nullish coalescing operator
    // maximum zoom of 20px user can't zoom more than 20px
    options: { radius: 75, maxZoom: 20 },
  });

  useMapViewPageHooks(filtersState, bounds);

  return (
    <Page header footer>
      <div id="map-view-page" className={cx('g-full-page')}>
        {/* this is for filter bar on the google map view */}
        {initialData && defaultFilters.data && (
          <ApartmentFilters
            // fullWidth will shows the bar of filter in full screen width like googleMap
            fullWidth
            filters={filtersState}
            loading={state.loading}
            defaultFilters={defaultFilters.data}
          />
        )}
        <br />
        {!initialData && (
          <Col className={cx('city-picker-col')} {...APARTMENT_CARD.BASE}>
            <CityPicker
              // onSelect function is created in src/components/CityPicker/index.tsx since onSelect taking (DATA) as parameter from src/components/CityPicker/index.tsx therefore all the values like lng, lat will be available for us here
              onSelect={(value) => {
                // for center coordinates of the city
                const { lat, lng } = value.center;
                // bounds have the coordinates
                setBounds(value.newBounds);
                setInitialData({
                  defaultZoom: value.zoom,
                  // the center coordinates will be defaultCenter so user will get to see all the apartments as user starts from center
                  defaultCenter: { lat, lng },
                });
                console.log('VAALUEEEE', value);
              }}
              // these heightId and widthId will be used to adjust the height and width of map view
              heightId="map-view-page"
              widthId="map-view-page"
            />
          </Col>
        )}
        {console.log('INITIAL DATAAAA', initialData)}
        <Row>
          <Col id="map-view-col" className={cx('map-holder')} span={24} md={{ span: 24 }}>
            {!!state.data?.length && initialData && (
              <GoogleMapReact
                {...initialData}
                // default zoom when user gets into map_view page
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={(ins) => {
                  if (mapRef) {
                    mapRef.current = ins;
                  }
                }}
                bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
                onChange={(change) => {
                  setZoom(change.zoom);
                  setBounds(change.bounds);
                }}
              >
                {clusters.map((cluster) => {
                  const lng = cluster.geometry.coordinates[0];
                  const lat = cluster.geometry.coordinates[1];
                  return (
                    // onClusterClick function is passed as PROP and this function will ZOOM IN the user when user click on the MARKERS WITH number then this cluster function will runs to zoom in user
                    <ApartmentMarker
                      onClusterClick={() => {
                        const expansionZoom = Math.min(
                          supercluster?.getClusterExpansionZoom(cluster.id as number) ?? 0,
                          20,
                        );
                        // setZoom will zoom in the map for user on google map
                        mapRef.current.map.setZoom(expansionZoom);
                        // panTo is used when user clicked on marker with numbers then user will be zoomed (TOWARDS) the marker where user have clicked therefore we've used panTo with coordinates
                        mapRef.current.map.panTo({ lat, lng });
                      }}
                      key={`${lat}-${lng}-${cluster.id ?? cluster.properties.id}`}
                      lat={lat}
                      lng={lng}
                      {...cluster}
                    />
                  );
                })}
              </GoogleMapReact>
            )}
          </Col>
        </Row>
      </div>
    </Page>
  );
}

export default MapViewPage;
