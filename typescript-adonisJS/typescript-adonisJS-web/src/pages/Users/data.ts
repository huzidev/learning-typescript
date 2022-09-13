import { UserDetail } from '@store/user/types';
import { ColumnsType } from 'antd/lib/table';
import startCase from 'lodash/startCase';

// these columnKeys will be shown at top when Admin clicked on manage users
const columnsKeys = [
  'id',
  'name',
  'email',
  'role',
  'isActive',
  'isBanned',
  'isVerified',
  'createdAt',
  'updatedAt',
];

// boolKeys means they'll either be true(yes) or false(no)
export const boolKeys = ['isActive', 'isBanned', 'isVerified'];

export const columns: ColumnsType<UserDetail> = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  sorter: true,
  // startCase will make first letter Capital of any word
  title: startCase(key),
}));
