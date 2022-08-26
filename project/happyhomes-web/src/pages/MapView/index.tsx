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
  const [zoom, setZoom] = useState(10);
  const [initialData, setInitialData] = useState<GoogleMapReact.Props | null>(null);
  const [bounds, setBounds] = useState<GoogleMapReact.Bounds | null>(null);
  const apartment = useApartment();

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
    // clusters are used for when user clicked on apartment marker then it'll zoom in this is for cluster is used for
    zoom,
    points,
    bounds: [bounds?.nw.lng ?? 0, bounds?.se.lat ?? 0, bounds?.se.lng ?? 0, bounds?.nw.lat ?? 0],
    options: { radius: 75, maxZoom: 20 },
  });

  useMapViewPageHooks(filtersState, bounds);

  return (
    <Page header footer>
      <div id="map-view-page" className={cx('g-full-page')}>
        {initialData && defaultFilters.data?.minPrice && (
          <ApartmentFilters
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
              onSelect={(value) => {
                setBounds(value.newBounds);
                setInitialData({
                  defaultZoom: value.zoom,
                  defaultCenter: { lat: value.center.lat, lng: value.center.lng },
                });
              }}
              heightId="map-view-page"
              widthId="map-view-col"
            />
          </Col>
        )}
        <Row>
          <Col id="map-view-col" className={cx('map-holder')} span={24} md={{ span: 24 }}>
            {!!state.data?.length && initialData && (
              <GoogleMapReact
                // {...initialData} is mandatory to use for getting all the apartments data
                {...initialData}
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
                  // the google maps will crashed when their is no apartment marker therefore when we remove setBounds(change.bounds) the google map won't crashed even when their is no apartment marker
                  // setBounds(change.bounds)
                }}
              >
                {clusters.map((cluster) => {
                  const lng = cluster.geometry.coordinates[0];
                  const lat = cluster.geometry.coordinates[1];
                  return (
                    <ApartmentMarker
                      onClusterClick={() => {
                        const expansionZoom = Math.min(
                          supercluster?.getClusterExpansionZoom(cluster.id as number) ?? 0,
                          20,
                        );
                        mapRef.current.map.setZoom(expansionZoom);
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
