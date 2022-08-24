import { Button, Col, Empty, Row, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

import { useApartment } from '@store/apartment'; // useApartment is created in store/apartment/index.ts

import ROUTE_PATHS from 'Router/paths';
import { cx } from 'alias';

import ApartmentCardPlaceholders from 'components/ApartmentCard/Placeholder';
import useApartmentFiltersState from 'components/ApartmentFilters/hooks';
import { APARTMENT_CARD } from 'components/ApartmentCard/data';
import ApartmentFilters from 'components/ApartmentFilters';
import ApartmentCard from 'components/ApartmentCard';
import Page from 'components/Page';

import { useDashboardPageHooks } from './hooks';
import './styles.less';

function DashboardPage(): JSX.Element {
  const apartment = useApartment(); // apartment variable will have access of all the functions inside useApartment
  const history = useHistory();

  const state = apartment.publicListState; // will loads all the apartments uploaded by all realtors therefore it is called apartment.publicListState
  const { defaultFilters } = apartment; // DESTRUCTURING
  // here filtersState is for storing filter when user clicks on (load more) then the previous filter will be apply automatically to new loaded apartments (if) user have applied filters
  const filtersState = useApartmentFiltersState(
    defaultFilters.data,
    apartment.publicListState.filters,
  );

  useDashboardPageHooks(filtersState);

  console.log('dashboard State', state);
  console.log('dashboard State data', state.data);
  console.log('dashboard State data length', state.data?.length);
  console.log('dashboard meta', state.meta);
  console.log('filtersState activeState', filtersState.activeState);

  return (
    <Page header footer>
      <div id="dashboard-page" className={cx('g-full-page')}>
        {defaultFilters.data?.minPrice && (
          <ApartmentFilters
            filters={filtersState}
            loading={state.loading}
            defaultFilters={defaultFilters.data}
          />
        )}
        <br />
        <Col {...APARTMENT_CARD.BASE}>
          {!state.loading && !state.data?.length && state.meta && (
            // if user insert wrong filter which doesn't match to any apartment
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 120,
              }}
              description={<span>No apartment found. try resetting your filters!</span>}
            >
              {/* resetAndApply function is in components/apartmentFilters/hooks.ts */}
              {/* filtersState is just a name of variable which have all the access of useApartmentFiltersState */}
              <Button type="primary" onClick={() => filtersState.resetAndApply()}>
                Reset Filters
              </Button>
            </Empty>
          )}
          {state.loading && !state.data?.length && <ApartmentCardPlaceholders />}
          {!!state.data?.length && ( // !!state.data?.length will give true then data will load
            <Row {...APARTMENT_CARD.ROW}>
              {state.data.map((item) => (
                // state.data will brings all the apartments
                <ApartmentCard
                  item={item}
                  key={item.id.toString()}
                  onClick={(id) => history.push(ROUTE_PATHS.APARTMENT_VIEW + id)} // for a single apartment on which user will click + id of that apartment
                  onRealtorClick={(id) => history.push(ROUTE_PATHS.VIEW_PROFILE + id)} // onClick and onRealtorClick both takes (id: number) as a parameter
                />
              ))}
            </Row>
          )}
          {/* when user clicked on load more it'll spin a wheel of loading */}
          {state.loading && state.data?.length && (
            // state.data?.length will be 25 initially but every time user clicked on load more length will be increase by +25 since 25 apartments will be load every time user clicked on load more
            <Col span={24}>
              <Spin />
            </Col>
          )}
          {/* state.meta have all the information like total apartments, apartments per page,  current page, last page, next page and previous page URL etc */}
          {state.meta && state.meta?.currentPage < state.meta?.lastPage && (
            // initially currentPage will be 1 and if user clicked on is on last page then Load More button will not be shown any more since their will be no more apartments available next
            <Button
              type="primary"
              loading={state.loading}
              style={{ marginTop: '16px' }} // for button margin from top
              onClick={() =>
                state.meta &&
                // filtersState.activeState will take the current state of filter suppose if user select a specific filter then that specific filter will be stored in
                // filtersState.activeState and further apartments after (load more) will be of same filter state
                // by default filtersState.activeState will take default filters like minRoom 1 maxRoom 10
                apartment.getPublicList(state.meta.currentPage + 1, filtersState.activeState)
              }
            >
              Load more
            </Button>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default DashboardPage;
