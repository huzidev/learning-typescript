/* eslint-disable  */
import { useIntl } from 'react-intl';
import { Button, Divider, Popover, Space, Typography } from 'antd';
import { useHistory } from 'react-router-dom';

// marker IMAGE
import mapMarker from 'assets/marker.svg';

import { INTL_CURRENCY } from 'utils/intl';
import ROUTE_PATHS from 'Router/paths';

// mapLink takes lat and lng and according to the coordinates it'll links user to the path on the google map 
import { mapLink } from 'utils';
import { cx } from 'alias';

import './styles.less';

// the properties: prop is received as (PROPS) received from src/pages/apartmentView/index.tsx
function ApartmentMarker({ properties: prop, onClusterClick, hidePopOver = false }: any): JSX.Element {
  const isCluster = prop.cluster;
  const history = useHistory();
  const intl = useIntl();
  const content = (
    <div
      className={cx('apartment-marker')}
      onClick={() => {
        // isCluster and onClusterClick are the clicks on the (MARKER) when user is MAX ZOOM OUT then user can see some markers will shows some NUMBERS these numbers are the quantity of apartments on that marker so when user (CLICKED) on that (MARKERS) with numbers on it is called (CLUSTER) which will zoom in user to show apartments with in the marker
        if (isCluster && onClusterClick) {
          // onClusterClick() function will ZOOM in the map when user clicked on marker with apartments quantity on it
          onClusterClick();
          console.log('CLUSETR CLICKED');
        }
      }}
    >
      {/* this image is of marker which is going to be appear on ours google map when we view any apartment */}
      <img src={mapMarker} alt="Map marker" className={cx('image')} />
      {isCluster && (
        <div className={cx('count-base')}>
          {/* will tells the QUANTITY of apartments on each marker when zoom is MAX OUT */}
          <Typography.Text className={cx('count-text')}>{prop.point_count}</Typography.Text>
        </div>
      )}
    </div>
  );

  // it is necessary to do otherwise when their is quantity of apartments on marker the popover will show and will show NaN
  // means when isCluster or hidePopOver is true then return content so (prop.point_count) will update the quantity therefore we've specially used || OR sign because hidePopOver is false by default
  if (isCluster || hidePopOver) {
    // return content will update the value of (prop.point_count) when user clicked on the apartment with numbers on it so with every zoom (prop.point_count) value will update
    return content;
  }
  return (
    // this  (POPOVER) will shows the content div when we (HOVER) on the marker
    <Popover
      title={prop.name} // for the name of realtor uploaded that specific apartment
      content={
        <>
          {/* these data will run when we hover on marker in google map when user wanted to view the apartments throughout the city after selecting any city on map view */}
          <Typography.Text>
            <span className={cx('highlight-span-text')}>{intl.formatNumber(prop.size)}</span> sqft
          </Typography.Text>
          <br />
          <Typography.Text>
            <span className={cx('highlight-span-text')}>
              {intl.formatNumber(prop.price, INTL_CURRENCY)}
            </span>{' '}
            per month
          </Typography.Text>
          <br />
          <Typography.Text>
            <span className={cx('highlight-span-text')}>{prop.rooms}</span> Rooms
          </Typography.Text>
          <Divider />
          <Space size="middle">
          {/* this will send user to that specific apartment information means at apartment view + props.id will add the id of that specific apartment in the URL */}
          <Button size="small" onClick={() => history.push(ROUTE_PATHS.APARTMENT_VIEW + prop.id)}>
            View
          </Button>
            <Button size="small" target="_blank" href={mapLink(prop.lat, prop.lng)}>
              Map
            </Button>
          </Space>
        </>
      }
    >
      {/* this content will shows the marker for the apartment because when user is at the extreme zoom out the marker will only shows the available apartments in the form of number like 7 will show on marker which means their are 7 apartments in that specific area when we zoom in the number will reduced and eventually all the marker will have no number then we can hover on them to get the details */}
      {/* compulsory to do this */}
      {content}
    </Popover>
  );
}

export default ApartmentMarker;
