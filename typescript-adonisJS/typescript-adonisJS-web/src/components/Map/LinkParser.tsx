import GoogleMapReact from 'google-map-react';
import { Button, Form, Input } from 'antd';

import { cx } from 'alias';

import './styles.less';

// for getting lat and lng from google map link
import { latLngFromLink } from 'utils/map';

interface MapLinkParserProps {
  onChange: (coords: GoogleMapReact.Coords) => void;
}

// this page is for (Enter google map link) when uploading apartments for coordinates of apartments by (Enter google map link) method
function MapLinkParser({ onChange }: MapLinkParserProps): JSX.Element {
  return (
    <div className={cx('map-link-parser')}>
      <Form layout="vertical" onFinish={(data) => onChange(latLngFromLink(data.link)!)}>
        <Form.Item
          required
          name="link"
          label="Link"
          tooltip="Link from google maps like : https://www.google.com/maps/place/abc"
          rules={[
            {
              // link type of URL
              type: 'url',
              required: true,
              message: 'Please enter the google map place link',
            },
            () => ({
              validator(_, value) {
                // value.includes('google.com/maps/place') is the syntax for URL if user paste the URL with this syntax in it then runs the code
                if (value && value.includes('google.com/maps/place')) {
                  const cords = latLngFromLink(value);
                  if (cords) {
                    return Promise.resolve();
                  }
                }
                return Promise.reject(new Error('Invalid google map place link'));
              },
            }),
          ]}
        >
          <Input placeholder="Please enter the google map link" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Parse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

MapLinkParser.defaultProps = {};
export default MapLinkParser;
