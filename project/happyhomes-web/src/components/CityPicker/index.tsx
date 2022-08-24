/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, notification, Space, Typography, Button } from 'antd';

// fitBounds is a React library for showing google maps on web-pages
import { fitBounds } from 'google-map-react';
import { cx } from 'alias';
import './style.less';

// cities have information in (ARRAY OF OBJECT) with (city name and city image)
// citiesMap have coordinates for google map
import { cities, citiesMap } from './data';

export interface CityPickerProps {
  onSelect: (data: any) => void;
  heightId: string;
  widthId: string;
}

function CityPicker({ onSelect, heightId, widthId }: CityPickerProps): JSX.Element {
  const handleCity = async (city: string) => {
    try {
      const bounds = citiesMap[city];
      const height = document.getElementById(heightId)?.clientHeight;
      const width = document.getElementById(widthId)?.clientHeight;
      // here we've used (null coalescing operator) for checking if width or height is (NULL OR UNDEFINED) then height or width will be 100px
      const size = { width: width ?? 100, height: height ?? 100 };
      // fitBounds will takes two parameters first is for COORDINATES (NWSE) and other is for size of google map to be shown on the page
      const data = fitBounds(bounds, size);
      // onSelect() function takes a parameter data
      onSelect(data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch city' });
    }
  };
  return (
    // to select a city karachi, islamabad
    <Card title="Please select a city" className={cx('city-picker')}>
      <Space>
        {/* {cities.map((city) => (
          <>
            <Button key={city} onClick={() => handleCity(city)}>
              {city}
            </Button>
          </>
        ))} */}
        <>
          {cities.map((data) => (
            // here data.image in class will acts like class because we are using mapping therefore data.image result will be khi, hyd, lhr. isl hence class names will also be these so we can target these classes in less files like .khi background-image: ...
            <div className={cx('slide-base', data.image)} key={data.image}>
              <Button onClick={() => handleCity(data.city)} className={cx('button-background')}>
                <Typography.Title level={3} className={cx('city-names')}>
                  {data.city}
                </Typography.Title>
              </Button>
            </div>
          ))}
        </>
      </Space>
    </Card>
  );
}

export default CityPicker;
