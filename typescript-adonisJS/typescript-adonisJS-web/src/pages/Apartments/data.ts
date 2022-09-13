import { ApartmentDetail } from '@store/apartment/types';
import { ColumnsType } from 'antd/lib/table';
import startCase from 'lodash/startCase';

// these columnKeys will be shown at top when Realtor or Admin clicked on manage apartments
const columnsKeys = [
  'id',
  'name',
  'description',
  'size',
  'price',
  'rooms',
  'lat',
  'lng',
  'isActive',
  'status',
  'realtorId',
  'createdAt',
  'updatedAt',
];

// means we can't put sort on lat and lng (COORDINATIONS)
const ignoreSort = ['lat', 'lng'];

export const boolKeys = ['isActive'];

// realtorSkipKeys means when realtor go to manage apartments then realtor can't see isActive, realtorId in manage apartments page therefore we named it realtor (Skip) Key
export const realtorSkipKeys = ['isActive', 'realtorId'];

export const columns: ColumnsType<ApartmentDetail> = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  // startCase will make first letter Capital of any word
  title: startCase(key),
  // this will make sort to not to be put on lat, lng
  sorter: !ignoreSort.includes(key),
}));
