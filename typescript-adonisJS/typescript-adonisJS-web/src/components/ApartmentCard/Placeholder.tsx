import { Col, Row, Skeleton } from 'antd';

import { cx } from 'alias';

import { APARTMENT_CARD } from './data';

export interface ApartmentCardPlaceholdersProps {
  count: number;
}

function ApartmentCardPlaceholders({ count }: ApartmentCardPlaceholdersProps): JSX.Element {
  return (
    <Row {...APARTMENT_CARD.ROW}>
      {Array.from(Array(count).keys()).map((i) => (
        <Col {...APARTMENT_CARD.ITEM} key={i.toString()}>
          <Skeleton.Image className={cx('skeleton-image')} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </Col>
      ))}
    </Row>
  );
}

ApartmentCardPlaceholders.defaultProps = {
  count: 6,
};

export default ApartmentCardPlaceholders;
