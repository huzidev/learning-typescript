import { useState } from 'react';
import { Carousel, Col, Grid, Typography } from 'antd';
import cx from 'classnames';

import responsive from '../responsive';
import { slides } from './data';

import './styles.less';

function HomeSlider(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const breaks = Grid.useBreakpoint();

  return (
    <Carousel
      fade
      infinite
      autoplay
      autoplaySpeed={5000}
      afterChange={(index) => setActiveIndex(index)}
    >
      {slides.map((slide, slideIndex) => (
        <div className={cx('slide-base', slide.image)} key={slide.image}>
          <div className={cx('slide-bg')} />
          <Col
            {...responsive.slider}
            className={cx('slide-text', {
              active: slideIndex === activeIndex,
              mobile: !breaks.lg,
            })}
          >
            <Typography.Title level={1} className={cx('title')}>
              {slide.title}
            </Typography.Title>
            <Typography.Title level={4} type="secondary" className={cx('description')}>
              {slide.description}
            </Typography.Title>
          </Col>
        </div>
      ))}
    </Carousel>
  );
}

export default HomeSlider;
