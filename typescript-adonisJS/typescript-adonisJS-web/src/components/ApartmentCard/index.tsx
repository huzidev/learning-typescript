import { Card, Col, Divider, Skeleton, Space, Tag, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl'; // library to internationalize React applications provides format text, numbers and dates like intl.formatDate and to specify the types for date

import { ApartmentDetail } from '@store/apartment/types';
import { useAuth } from '@store/auth';

import { INTL_CURRENCY } from 'utils/intl';
import ROUTE_PATHS from 'Router/paths';
import { hasPermission, mapLink } from 'utils';
import { cx } from 'alias';

import { APARTMENT_CARD } from './data';

import './styles.less';

// all the props receiving from page/dashboard/index.tsx
export interface ApartmentCardProps {
  fullWidth?: boolean;
  item: ApartmentDetail; // since items is equal to apartmentDetails therefore item will have all the information like price, address, realtorId etc
  onRealtorClick?: (id: number) => void; // onRealtorClick is function created in pages/dashboard/index.tsx <apartmentCard/> in which we've passed props called onClickRealtor which will push us to the path specify to it
  onClick?: (id: number) => void;
}
function ApartmentCard({
  onClick,
  item, // item will receive all information like address, price per month, by realtorID, lat, lng
  onRealtorClick,
  fullWidth,
}: ApartmentCardProps): JSX.Element {
  const history = useHistory();
  const intl = useIntl(); // internationalize React applications
  const auth = useAuth(); // for auth.user.role, auth.user.id
  return (
    <Col
      {...(fullWidth ? {} : APARTMENT_CARD.ITEM)}
      key={item.id.toString()}
      className={cx('apartment-card')}
      // so when user clicked on any apartment then user will be linked to that apartment id therefore item.id
      onClick={() => onClick && onClick(item.id)} // it is necessary to do onClick && onClick(item.id) otherwise onClick undefined error will be shown onClick will takes a parameter (id) but their we'll send an (ARGUMENT) then this argument will be received as a (PARAMETER) in pages/dashboard/index.tsx
    >
      <Card
        cover={<Skeleton.Image className={cx('skeleton-image-full')} />}
        actions={[
          <Space size="large" align="end">
            {/* for editing OR updating apartment and only admin and genuine realtor (the realtor who uploaded that apartment) could edit the information */}
            {/* // here auth.user is just like (parameter) so we can pass the (auth.user.id) for checking it with item.realtorId or we can also DIRECT use auth.user!.id (!) at ends means value can't be null or undefined */}
            {(hasPermission('admin', auth.user!.role) || auth.user!.id === item.realtorId) && ( // auth.user.id is the id of LoggedIn user and item.realtorId is the Id of the owner of that apartment on which user clicked therefore if auth.user.id means loggedIn user id matches with the id of the owner of that apartment params.id then EDIT button will be available
              <Typography.Link
                onClick={(event) => {
                  event.stopPropagation();
                  history.push(ROUTE_PATHS.APARTMENT_UPDATE + item.id);
                }}
              >
                Edit
              </Typography.Link>
            )}
            <Typography.Link
              onClick={(event) => {
                event.stopPropagation();
              }}
              target="_blank"
              href={mapLink(item.lat, item.lng)} // the lat and lng will appear on map directly
            >
              Open in map
            </Typography.Link>
          </Space>,
        ]}
      >
        <Typography.Title level={5}>{item.name}</Typography.Title>
        <Typography.Text type="secondary">{item.description}</Typography.Text>
        <br />
        <Typography.Text>
          by{' '}
          <Typography.Link
            onClick={(event) => {
              event.stopPropagation();
              if (onRealtorClick) {
                // means if we click of realtor name it'll take us to that specific page with realtor info since we are using Typography.Link like anchor tag
                onRealtorClick(item.realtorId); // onRealtorClick will takes a parameter (id) but their we'll send an (ARGUMENT) then this argument will be received as a (PARAMETER) in pages/dashboard/index.tsx
                // item.realtorId is the id of that specific realtor on which user will click
                console.log('Realtor Id on which user clicked', item.realtorId);
              }
            }}
          >
            {item.realtor.name}
          </Typography.Link>
        </Typography.Text>
        <Divider />
        <Typography.Title level={5}>Rent and details</Typography.Title>
        <Typography.Text>
          {/* for size of apartment in square feet */}
          {/* here we;ve used intl for internationalize ours app */}
          <span className={cx('highlight-span-text')}>{intl.formatNumber(item.size)}</span> sqft
        </Typography.Text>
        <br />
        <Typography.Text>
          <span className={cx('highlight-span-text')}>
            {intl.formatNumber(item.price, INTL_CURRENCY)}
            {/* in INTL_CURRENCY we've defined currency types like USD */}
          </span>{' '}
          per month
        </Typography.Text>
        <br />
        <Typography.Text>
          <span className={cx('highlight-span-text')}>{item.rooms}</span> Rooms
        </Typography.Text>
        <br />
        <Typography.Text>
          Listed on{' '}
          <span className={cx('highlight-span-text')}>
            {/* will shows the date when the apartment was created on listed on */}
            {/* item.createdAt will takes the time from ours mySQL database then changes it's format with intl library of react */}
            {intl.formatDate(item.createdAt, {
              day: '2-digit',
              month: 'short', // short mean if JULY then it'll print JUL if we uses Long then it'll print JULY
              year: 'numeric',
            })}
          </span>
        </Typography.Text>
      </Card>
      <Tag color="magenta" className={cx('status-tag')}>
        {/* will shows rather available or rented */}
        {item.status}
      </Tag>
      {/* so admin can see wether the apartment is active or removed */}
      {hasPermission('admin', auth.user?.role) && ( // auth.user?.role will check whether it's admins or realtor or client and hasPermission will takes 2 parameters first is allowedRole which is admin and second is myRole means what role does user have whether it's admin or realtor or client it can be checked with auth.user?.role
        <Tag color="magenta" className={cx('remove-tag')}>
          {item.isActive ? 'Active' : 'Removed'}
        </Tag>
      )}
      {console.log('role', auth.user?.role)}
    </Col>
  );
}

// means initially these are the values if user loggedIn the page or if user came back from map_view, edit profile from any where to this page then these defaultProps will be applied automatically every time user gets away from home page
ApartmentCard.defaultProps = {
  onClick: null,
  onRealtorClick: null,
  fullWidth: false,
};
export default ApartmentCard;
