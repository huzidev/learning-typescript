import qs from 'query-string';
import { ColumnType } from 'antd/lib/table';
import { useHistory } from 'react-router-dom';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';

import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';

export function mapBoolColumns<J, K extends ColumnType<J> = ColumnType<J>>(
  column: K,
  keys: string[],
): K {
  if (column.key && keys.includes(column.key.toString())) {
    // value yes no is for booleanValues for example isActive will either be Yes or No and isBanned will either be Yes or No
    return { ...column, render: (value) => (value ? 'Yes' : 'No') };
  }
  return column;
}

export function sortToQs<J, K extends SorterResult<J> = SorterResult<J>>(sort: K): string | null {
  if (!sort.order) return null;
  // means sort result which will either be asc or desc
  const map: { [id: string]: string } = { descend: 'desc', ascend: 'asc' };
  if (sort.field) {
    const obj = JSON.stringify({ [sort.field.toString()]: map[sort.order] });
    return obj;
  }
  return null;
}

export function onTableChange<J>(
  history: ReturnType<typeof useHistory>,
  path: string,
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<J> | SorterResult<J>[],
): void {
  const { search } = history.location;
  // search will be like ?sort=%.....
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initial: any = search ? qs.parse(search) : {};
  // initial will be "id": "asc" or "id": "desc" if user sort the (id) in ascending or desc order and if user change the sort of name then it'll be "name": "asc" or "name": "desc"
  // therefore we've used condition which says if search is true means if sort value is change then (qs.parse) means parse query string (URL)
  console.log('INITIAL INITAL FROM UTILS', initial);
  console.log('INITIAL INITAL SEARCH', search);
  if (sorter) {
    initial.sort = sortToQs<J>(sorter as SorterResult<J>);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleaned = omitBy(initial, isEmpty) as any;

  history.replace({
    pathname: path + pagination.current,
    search: qs.stringify(cleaned),
  });
}
