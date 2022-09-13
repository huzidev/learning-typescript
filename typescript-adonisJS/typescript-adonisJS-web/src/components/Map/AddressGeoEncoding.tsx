import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { Button, Form, Input, message } from 'antd';

import { cx } from 'alias';

import './styles.less';

// this page is for (Add Location Address) when uploading apartments for coordinates of apartments by (Add Location Address) method
interface AddressGeoEncodingProps {
  onChange: (coords: GoogleMapReact.Coords) => void;
}

function AddressGeoEncoding({ onChange }: AddressGeoEncodingProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  return (
    <div className={cx('map-link-parser')}>
      <Form
        layout="vertical"
        onFinish={async (data) => {
          setLoading(true);
          try {
            const resp = await Geocode.fromAddress(data.address);
            if (!resp.results.length) {
              setLoading(false);
              message.error('Cannot parse this address');
              return;
            }
            const coords = resp.results[0].geometry.location;
            onChange(coords);
          } catch (e) {
            message.error('Cannot parse this address');
          }
          setLoading(false);
        }}
      >
        <Form.Item
          required
          name="address"
          label="Address"
          tooltip="Address is required"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter an address',
            },
          ]}
        >
          <Input placeholder="Please enter the address" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Parse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

AddressGeoEncoding.defaultProps = {};
export default AddressGeoEncoding;
