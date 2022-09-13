import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  ColProps,
  Row,
  Select,
  Slider,
  SliderSingleProps,
  Space,
  Typography,
} from 'antd';
// slider which user can slide to select rooms, size, price
import { SliderRangeProps } from 'antd/lib/slider';
import { useIntl } from 'react-intl';

// types for filtersData like minSize, maxSize, minRooms etc
import { ApartmentFiltersData } from '@store/apartment/types';

// INTL_CURRENCY include type of currency like USD
import { INTL_CURRENCY } from 'utils/intl';
import { cx } from 'alias';

import { APARTMENT_CARD } from 'components/ApartmentCard/data';

import { ApartmentFiltersStateHandler } from './hooks';

interface ApartmentFiltersProps {
  loading?: boolean;
  fullWidth?: boolean;
  defaultFilters: ApartmentFiltersData;
  filters: ApartmentFiltersStateHandler;
}

const filtersCol: ColProps = { span: 24, sm: { span: 12 }, lg: { span: 6 }, md: { span: 6 } };

function ApartmentFilters({
  filters,
  loading,
  fullWidth,
  defaultFilters,
}: ApartmentFiltersProps): JSX.Element {
  // the range check-box initially at true but when user clicked on (range) check-box the rooms filter will shifts to one room only
  const [roomsInRange, setRoomsInRange] = useState(true);
  const intl = useIntl();

  // roomSliderProps will either be SliderSingleProps or SliderRangeProps, SliderSingleProps will be when user clicked on range and SliderRangeProps will be when user is slider is available to move
  let roomSliderProps: SliderSingleProps | SliderRangeProps = {};

  // if (range check-box) is false
  if (roomsInRange === false) {
    roomSliderProps = {
      // range false therefore the slider will only shows apartment with 1 rooms because when slider got false it won't be able to move therefore it'll only shows minRoom only
      range: false,
      // value for slider will shifts to minRooms means at 1 room
      value: filters.state.minRooms,
      onChange: (v) => filters.setRooms(v, v),
    } as SliderSingleProps;
  } // when range is true
  else {
    roomSliderProps = {
      range: true,
      // means slider will works fine one bar will be at minRooms which is at 1 and other bar will be at maxRoom which is at 10
      value: [filters.state.minRooms, filters.state.maxRooms],
      onChange: ([min, max]) => filters.setRooms(min, max),
    } as SliderRangeProps;
  }

  function resetFilter() {
    filters.reset();
    if (roomsInRange === false) {
      // so when user clicked on reset button the range will also gets back to it's default form
      setRoomsInRange((prevState) => !prevState);
    }
  }

  return (
    <Col {...(fullWidth ? { span: 22, offset: 1 } : APARTMENT_CARD.BASE)}>
      <Card
        title="Filters & Sort"
        extra={
          <Space align="end">
            {/* will runs the function for reset filters */}
            <Button disabled={filters.isDefault} onClick={() => resetFilter()}>
              Reset
            </Button>
            <Button disabled={filters.isSame} onClick={() => filters.apply()} type="primary">
              Apply
            </Button>
          </Space>
        }
      >
        <Row {...APARTMENT_CARD.ROW}>
          <Col {...filtersCol}>
            {/* for filter price values of min and max */}
            <Typography.Text>
              Price{' '}
              <span className={cx('highlight-span-text')}>
                ({intl.formatNumber(filters.state.minPrice, INTL_CURRENCY)}
              </span>
              {' - '}
              <span className={cx('highlight-span-text')}>
                {intl.formatNumber(filters.state.maxPrice, INTL_CURRENCY)})
              </span>
            </Typography.Text>
            {/* for filter slider for min and max price */}
            <Slider
              range
              disabled={loading}
              min={defaultFilters.minPrice}
              max={defaultFilters.maxPrice}
              // when user slides the slider for filter the values will change accordingly
              onChange={([min, max]) => filters.setPrice(min, max)}
              value={[filters.state.minPrice, filters.state.maxPrice]}
            />
          </Col>
          <Col {...filtersCol}>
            {/* for filter size values of min and max */}
            <Typography.Text>
              Size{' '}
              <span className={cx('highlight-span-text')}>
                ({intl.formatNumber(filters.state.minSize)}
              </span>
              {' - '}
              <span className={cx('highlight-span-text')}>
                {intl.formatNumber(filters.state.maxSize)})
              </span>{' '}
              sqft
            </Typography.Text>
            {/* for filter slider for min and max size */}
            <Slider
              range
              disabled={loading}
              min={defaultFilters.minSize}
              max={defaultFilters.maxSize}
              onChange={([min, max]) => filters.setSize(min, max)}
              value={[filters.state.minSize, filters.state.maxSize]}
            />
          </Col>
          <Col {...filtersCol}>
            <Row justify="space-between">
              {/* for filter rooms values of min and max */}
              <Typography.Text>
                Rooms{' '}
                <span className={cx('highlight-span-text')}>
                  ({intl.formatNumber(filters.state.minRooms)}
                </span>
                {' - '}
                <span className={cx('highlight-span-text')}>
                  {intl.formatNumber(filters.state.maxRooms)})
                </span>
              </Typography.Text>
              {/* check-box to clicked for range */}
              <Checkbox
                checked={roomsInRange}
                onChange={() => {
                  setRoomsInRange((prevState) => !prevState);
                  // if user clicked on checkbox then their will be (NO maxRooms) therefore we've write filters.state.minRooms (TWO) times
                  if (roomsInRange) {
                    filters.setRooms(filters.state.minRooms, filters.state.minRooms);
                  } // if condition is false
                  else {
                    filters.setRooms(filters.state.minRooms, filters.activeState.maxRooms);
                  }
                }}
              >
                Range
              </Checkbox>
            </Row>
            {/* for filter slider for min and max rooms */}
            <Slider
              disabled={loading}
              min={defaultFilters.minRooms}
              max={defaultFilters.maxRooms}
              // here we didn't used VALUE AND ONCHANGE rather we've used {...roomSliderProps} because this is already defined above with (value and onChange) in it
              {...roomSliderProps}
            />
          </Col>
          <Col {...filtersCol}>
            <Typography.Text>Sort by</Typography.Text>
            <br />
            {/* DROP DOWN button for selecting filter sort types */}
            <Select
              loading={loading}
              style={{ width: '100%' }}
              value={filters.state.sort}
              // their onChange will (RECEIVES arguments) when user select any sort type that sort type description which is in STRING like {"price":"asc"} this is string value will be RECEIVED here therefore type for sort is initially (EMPTY STRING) in hooks.ts file
              onChange={(sort) => filters.setSort(sort)}
            >
              <Select.Option value="">Default</Select.Option>
              {/* PRICE IN DESCENDING ORDER */}
              <Select.Option value={'{"price":"desc"}'}>Price (high to low)</Select.Option>
              {/* PRICE IN ASCENDING ORDER */}
              <Select.Option value={'{"price":"asc"}'}>Price (low to high)</Select.Option>
              <Select.Option value={'{"rooms":"desc"}'}>Room (max to min)</Select.Option>
              <Select.Option value={'{"rooms":"asc"}'}>Room (min to max)</Select.Option>
              <Select.Option value={'{"size":"desc"}'}>Size (max to min)</Select.Option>
              <Select.Option value={'{"size":"asc"}'}>Size (min to max)</Select.Option>
            </Select>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

// means initially these are the values if user loggedIn the page or if user came back from map_view, edit profile from any where to this page then these defaultProps will be applied automatically every time user gets away from home page
ApartmentFilters.defaultProps = {
  loading: false,
  fullWidth: false,
};

export default ApartmentFilters;
