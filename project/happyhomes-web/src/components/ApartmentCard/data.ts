import { ColProps, RowProps } from 'antd';

interface ApartmentCard {
  BASE: ColProps;
  ITEM: ColProps;
  ROW: RowProps;
}

export const APARTMENT_CARD: ApartmentCard = {
  BASE: { span: 22, offset: 1, xl: { span: 16, offset: 4 } },
  ITEM: { span: 24, lg: { span: 8 }, md: { span: 12 } },
  ROW: { gutter: [16, 16] },
};
