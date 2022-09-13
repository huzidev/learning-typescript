import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Col, Typography } from 'antd';

// marker logo for google map
import marker from 'assets/marker.svg';

import { GOOGLE_MAP_KEY } from 'configs/keys';
import { cx } from 'alias';

import CityPicker from 'components/CityPicker';

import './styles.less';

interface MapLocationPickerProps {
  onChange: (coords: GoogleMapReact.Coords) => void;
  initialValue?: GoogleMapReact.Coords | null;
}

function MapLocationPicker({ onChange, initialValue }: MapLocationPickerProps): JSX.Element {
  // initialData and coords initially will be NULL
  const [initialData, setInitialData] = useState<GoogleMapReact.Props | null>(null);
  const [coords, setCoords] = useState<GoogleMapReact.Coords | null>(null);

  useEffect(() => {
    if (initialValue) {
      setInitialData({
        defaultCenter: initialValue,
      });
    }
  }, [initialValue]);
  console.log('INITIAL VALUE', initialValue);
  console.log('INITIAL DATA', initialData);

  // coords will change as user drag the logo on the map to select a position
  useEffect(() => {
    if (coords) {
      // onChange will takes a parameter coords (lng, lat)
      onChange(coords);
    }
  }, [coords]);

  return (
    <div className={cx('map-location-picker')}>
      {coords && (
        // this will show LIVE COORDINATIONS (lng adn lat) at top of google map where user is selecting the location
        <Typography.Text>
          {/* toPrecision will take the total number we wanted to show since the coordinates can be 13.65654745 too many number but toPrecision(4) will show total 4 number like 11.33 */}
          {/* this toPrecision is only used when COORDS are showing at the top of google map where user is selecting the location with marker their only 4 digits of coordinates will be shown */}
          Cords: {coords.lat.toPrecision(4)} - {coords.lng.toPrecision(4)}
        </Typography.Text>
      )}
      <br />
      <br />
      {!initialData && (
        <Col className={cx('city-picker-col')} span={24}>
          <CityPicker
            onSelect={(value) => {
              const { lat, lng } = value.center;
              setInitialData({
                defaultCenter: { lat, lng },
              });
              setCoords({ lat, lng });
            }}
            // these heightId and widthId will be used to adjust the height and width of map view
            heightId="map-view-page"
            widthId="map-view-col"
          />
        </Col>
      )}
      {initialData && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
          {...initialData}
          defaultZoom={11}
          // onDrag when user drag the marker on the map then the Coords will be e.center.lat and e.center.lng the center value of marker
          onDrag={(e) => {
            setCoords({ lat: e.center.lat(), lng: e.center.lng() });
          }}
          onChange={(e) => {
            setCoords(e.center);
          }}
        >
          {/* marker logo */}
          <img
            src={marker}
            {...coords}
            alt="marker"
            style={{ transform: 'translate(-50%, 50%)' }}
          />
        </GoogleMapReact>
      )}
    </div>
  );
}

MapLocationPicker.defaultProps = {
  initialValue: null,
};
export default MapLocationPicker;
