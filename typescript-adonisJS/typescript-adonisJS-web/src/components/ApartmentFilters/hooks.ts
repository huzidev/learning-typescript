import { useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import {
  ApartmentFiltersData,
  ApartmentFiltersSortData, // have types for minPrice, maxPrice, minRooms, maxRooms and sort type and we're importing it so we don't have to write same stuff again and again in interface we've defined below
  ApartmentListFilters,
} from '@store/apartment/types';
import { usePrevious } from 'utils/hooks';

// we've defined a single type here so we can access this single word in ours interface we've created below called ApartmentFiltersStateHandler so we don't have to use (minPrice: number, maxPrice: number) again and again in ours interface
type MinMaxCallback = (minPrice: number, maxPrice: number) => void;

// these initialState is going to be defined as default state for ours function useApartmentFiltersState React.useState()
const initialState = {
  minPrice: 0,
  maxPrice: 1,
  minSize: 0,
  maxSize: 1,
  minRooms: 0,
  maxRooms: 1,
  sort: '', // initially empty string
};

export interface ApartmentFiltersStateHandler {
  init: boolean;
  isSame: boolean;
  isDefault: boolean;
  state: ApartmentFiltersSortData;
  defaultState: ApartmentFiltersSortData;
  activeState: ApartmentFiltersSortData;
  // now for setState we've defined (React.useDispatch) is because setState is a (function) of React.useState which is defined below const [state, setState] since (setState is function) therefore we've to defined the type accordingly
  setState: React.Dispatch<React.SetStateAction<ApartmentFiltersSortData>>;
  setPrice: MinMaxCallback;
  setRooms: MinMaxCallback;
  setSize: MinMaxCallback;
  reset: () => void;
  apply: () => void;
  resetAndApply: () => void;
  setSort: (sort: string) => void;
}

function useApartmentFiltersState(
  defaultFilters?: ApartmentFiltersData, // ApartmentFiltersData have defined types for maxRooms, minRooms, maxSize etc
  apiFilters?: ApartmentListFilters, // ApartmentListFilters have defined type for status, isActive, sort, nw and se etc
): ApartmentFiltersStateHandler {
  // for reset filters so when user clicked on reset the filter will change back to defaultState therefore we've used initialState here
  const [defaultState, setDefaultState] = useState<ApartmentFiltersSortData>(initialState);
  const [activeState, setActiveState] = useState<ApartmentFiltersSortData>(initialState);
  const [state, setState] = useState<ApartmentFiltersSortData>(initialState);
  const [init, setInit] = useState(false);

  const prevDefaultFilters = usePrevious(defaultFilters);

  useEffect(() => {
    if (
      defaultFilters &&
      !isEmpty(defaultFilters) &&
      // isEqual compare two value deeply therefore it takes 2 parameters to compare between
      !isEqual(prevDefaultFilters, defaultFilters)
    ) {
      const obj = {
        ...defaultFilters,
        sort: '',
      };
      setState(obj);
      setDefaultState(obj);
      setActiveState(obj);
      setInit(true);
    }
  }, [defaultFilters]);

  return useMemo(
    () => ({
      init,
      state,
      setState,
      defaultState,
      activeState,
      isSame: isEqual(state, activeState),
      isDefault: isEqual(state, defaultState),

      // so when user clicked on reset the filter will change back to defaultState
      reset: () => setState(defaultState),
      // will apply whatever the state is on setActiveState
      apply: () => setActiveState(state),
      resetAndApply: () => {
        // so when user reset the filter the setState and setActive state will change the filters to defaultState which is initialState
        setState(defaultState);
        setActiveState(defaultState);
      },

      // first we've defined the types that price must be number then for setState these are payloads receiving from user side
      setPrice: (minPrice: number, maxPrice: number) =>
        setState((s) => ({ ...s, minPrice, maxPrice })),
      setSize: (minSize: number, maxSize: number) => setState((s) => ({ ...s, minSize, maxSize })),
      setRooms: (minRooms: number, maxRooms: number) =>
        setState((s) => ({ ...s, minRooms, maxRooms })),
      // in index.tsx file we've created (DROP DOWN) menu where types for sort are defined as user select any type then that type will be RECEIVED here
      setSort: (sort) => setState((s) => ({ ...s, sort })),
    }),
    [state, apiFilters, defaultState, activeState, init],
  );
}

export default useApartmentFiltersState;
