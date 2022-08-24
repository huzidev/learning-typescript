import { UserDetail } from '@store/user/types';
import { ColumnsType } from 'antd/lib/table';
import startCase from 'lodash/startCase';

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

export const boolKeys = ['isActive', 'isBanned', 'isVerified'];

export const columns: ColumnsType<UserDetail> = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  sorter: true,
  title: startCase(key),
}));
