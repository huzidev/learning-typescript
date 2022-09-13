import { ActionType, BaseHTTPResponse, PaginationMeta, SubState } from '@store/types';
import { UserDetail } from '@store/user/types';

export type ApartmentStatus = 'available' | 'rented';
export const apartmentStatuses: ApartmentStatus[] = ['available', 'rented'];

export interface ApartmentState {
  defaultFilters: ApartmentFiltersResult;
  getDefaultFilters: () => void;

  myListState: ApartmentList;
  getMyList: (page: number, filters?: ApartmentListFilters) => void;

  mapListState: ApartmentList;
  getMapList: (filters?: ApartmentListFilters) => void;

  listByUserIDState: { [id: number]: ApartmentList };
  getListByUserID: (page: number, userId: number) => void;

  listState: ApartmentList;
  getList: (page: number, filters?: ApartmentListFilters) => void;

  publicListState: ApartmentList;
  getPublicList: (page: number, filters?: ApartmentListFilters) => void;
  resetPublicList: () => void;

  createState: SubState;
  create: (data: ApartmentCreateReq) => void;

  // update && remove && get
  idsState: { [id: number]: ApartmentIDSubState };
  getById: (id: number) => void;
  updateById: (id: number, data: ApartmentUpdateReq) => void;
  removeById: (id: number) => void;
  resetIdState: () => void;
}

export interface ApartmentActionResult extends BaseHTTPResponse {
  data: ApartmentDetail;
}

// it is optional therefore we've used partial
export interface ApartmentIDSubState extends SubState, Partial<ApartmentActionResult> {
  action?: ActionType;
}

export interface ApartmentFiltersResult extends BaseHTTPResponse, SubState {
  data?: ApartmentFiltersData;
}

// because all these are of type number
export interface ApartmentFiltersData {
  minSize: number;
  maxSize: number;
  minPrice: number;
  maxPrice: number;
  minRooms: number;
  maxRooms: number;
}

export interface ApartmentFiltersSortData extends ApartmentFiltersData {
  sort: string;
}

export interface ApartmentListFilters extends Partial<ApartmentFiltersData> {
  status?: ApartmentStatus;
  isActive?: boolean;
  sort?: string;
  nw?: string;
  se?: string;
}

interface ApartmentGeneral {
  name: string;
  description: string;
  size: number;
  price: number;
  rooms: number;
  lat: number;
  lng: number;
  status: ApartmentStatus;
}

export type ApartmentCreateReq = ApartmentGeneral;

// PARTIAL makes properties to OPTIONAL therefore we've used partial<ApartmentGeneral> in apartmentUpdate because during update it is not COMPULSORY to update everything rather it is OPTIONAL therefore we've used partial
export interface ApartmentUpdateReq extends Partial<ApartmentGeneral> {
  isActive?: boolean;
}

export interface ApartmentDetail extends ApartmentGeneral {
  id: number;
  isActive: boolean;
  realtorId: number;
  createdAt: string;
  updatedAt: string;
  realtor: UserDetail;
}

export interface ApartmentList extends SubState {
  data?: ApartmentDetail[]; // for all the apartments data in array of objects
  meta?: PaginationMeta; // paginationMeta means total pages, current page, last page and total apartments etc
  filters?: ApartmentListFilters; // all the filter including by default filter if any filter user change then information of that filter will be stored in filtersState.activeState
}
