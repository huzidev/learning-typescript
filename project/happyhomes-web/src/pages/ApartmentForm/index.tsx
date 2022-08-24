import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Result,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

// startCase will change the first letter to CAPITAL
import startCase from 'lodash/startCase';

import { ApartmentCreateReq, apartmentStatuses, ApartmentUpdateReq } from '@store/apartment/types';
import { useApartment } from '@store/apartment';
import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';
import { ParamsId } from 'types/route';
import { hasPermission } from 'utils';
import { cx } from 'alias';

// to convert address into Geo Code
import AddressGeoEncoding from 'components/Map/AddressGeoEncoding';

// tp pick location from google map with marker
import MapLocationPicker from 'components/Map/LocationPicker';

// to convert address URL from google map into COORDINATES
import MapLinkParser from 'components/Map/LinkParser';
import PageLoader from 'components/PageLoader';

// have Header, Children(all the data) and footer
import Page from 'components/Page';

import { useApartmentFormHooks } from './hooks';
import { colProps, modalMap } from './data';
import './styles.less';

// this page is for REALTOR and ADMIN when they wanted to update OR create apartment
function ApartmentFormPage(): JSX.Element {
  // used for (PICKER) when user wanted to pick address location by marker
  const [modalState, setModalState] = useState<GoogleMapReact.Coords | null>(null);
  const history = useHistory();
  const [form] = Form.useForm();
  const auth = useAuth();

  // for the pop-up modal
  const [modal, setModal] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams<any>() as ParamsId;
  const apartment = useApartment();
  const loading = false;
  const isUpdate = history.location.pathname.includes('update');
  const isCreate = !isUpdate;

  const apartmentDetail = apartment.idsState[params.id];

  // this ((hook caller) must have to be called (BEFORE) we defined any logics like if, functions etc and
  // this hooks is created in ./hooks.ts
  useApartmentFormHooks();

  // means (data) will either be for ApartmentUpdateReq or for ApartmentCreateReq
  const onFinish = (data: ApartmentUpdateReq | ApartmentCreateReq) => {
    if (isCreate) {
      // here if realtor wanted to create new apartment then (data as ApartmentCreateReq)
      apartment.create(data as ApartmentCreateReq);
    } else if (isUpdate) {
      apartment.updateById(params.id, data as ApartmentUpdateReq);
    }
  };

  if (
    (isUpdate && (!apartmentDetail || apartmentDetail?.loading)) ||
    apartment.defaultFilters.loading
  ) {
    return <PageLoader />;
  }

  const initialValues = {
    // when user wanted to create new apartment then by default value will be available
    status: 'available',
    // this will brings all the previous data of apartment when user wanted to update apartment like apartment name, description etc therefore we've used ... spread operator
    ...(apartmentDetail?.data ?? {}),
  };

  // so we can access default filter data and to show these filter min max values when user is creating or updating tha apartment these default value like minRoom 1 maxRoom 10 will be shown at rooms selector while creating or updating apartment
  const filters = apartment.defaultFilters.data;

  const noFields = [
    {
      label: 'Price per month',
      name: 'price',
      // const filters is defined above from where default values like minPrice 50 maxPrice 3000 are coming
      min: filters?.minPrice,
      max: filters?.maxPrice,
    },
    {
      label: 'Size',
      name: 'size',
      min: filters?.minSize,
      max: filters?.maxSize,
    },
    {
      label: 'Rooms',
      name: 'rooms',
      min: filters?.minRooms,
      max: filters?.maxRooms,
    },
  ];

  // used for (PICKER) when user wanted to pick address location by marker
  let modalInitialValue: GoogleMapReact.Coords | undefined | null = null;

  // isUpdate IF user wanted to change the coordinates of apartment during UPDATE
  // apartmentDetail have all the information like apartments data with Realtor information
  if (isUpdate && apartmentDetail?.data) {
    modalInitialValue = {
      // COORDINATES of that apartment which user wanted to update
      // so when user wanted to updated any apartment then COORDINATES for that apartments will be shown in mapLocationPicker
      lat: apartmentDetail.data.lat,
      lng: apartmentDetail.data.lng,
    };
  }

  // if apartment is (NOT) active or if CLIENT try to access that page therefore we've used !hasPermission means permission is for realtor if not realtor then isRemoved will be true
  const isRemoved = !apartmentDetail?.data?.isActive && !hasPermission('realtor', auth.user?.role);

  return (
    // to add header and footer in the page
    <Page header footer>
      {/* modal a pop-up menu which appears when user clicked on any button for selecting COORDINATES */}
      <Modal
        okButtonProps={{
          // means (OKAY) button won't be shown when (modal) type is LINK therefore we've used (hidden) because then we'll just use PARSE to parse to address and get COORDINATES from the address
          hidden: modal === 'link',
        }}
        visible={!!modal}
        // modalMap have the title defined like Map location picker, Enter google map link
        title={modalMap[modal ?? '']}
        // setModal(null) will disappear the modal
        onCancel={() => setModal(null)}
        onOk={() => {
          form.setFieldsValue(modalState);
          // setModal(null) will disappear the modal and we use it here as well because when user (CLICKED) on the (OKAY) button it'll set the COORDINATES for apartment and after that MODAL will DISAPPEAR therefore we've used setModal and setModalState to null on onOkay
          setModal(null);
          // since setModalState is only used FOR (drag the marker on google map) therefore we've to setModalState(null) here to set setModalState null after setting the COORDINATES on the map
          setModalState(null);
        }}
      >
        {console.log('MODAL TOP', modal)}
        {console.log('modalState modalState modalState TOP', modalState)}
        {modal === 'picker' && (
          // modalInitialValue have COORDINATES of apartment which realtor wanted to update and modalInitialValue will be null when realtor wanted to create new apartment
          // setModalState will set the COORDINATES when user drag the marker on google map
          <MapLocationPicker onChange={setModalState} initialValue={modalInitialValue} />
        )}
        {modal === 'link' && (
          <MapLinkParser
            onChange={(v) => {
              form.setFieldsValue(v);
              setModal(null);
            }}
          />
        )}
        {modal === 'address' && (
          <AddressGeoEncoding
            onChange={(v) => {
              form.setFieldsValue(v);
              setModal(null);
            }}
          />
        )}
        {console.log('modalState modalState modalState BOTTOM', modalState)}
      </Modal>
      <div id="apartment-form-page" className={cx('g-full-page')}>
        <Col {...colProps}>
          {/* if apartment is removed */}
          {isRemoved && (
            <Card>
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the apartment does not exist anymore."
                extra={
                  <Button type="primary" onClick={() => history.replace(ROUTE_PATHS.DASHBOARD)}>
                    Back Home
                  </Button>
                }
              />
            </Card>
          )}
          {!isRemoved && (
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
              <Card
                actions={[
                  <Row justify="end">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Save
                    </Button>
                  </Row>,
                ]}
                title={isUpdate ? 'Update apartment' : 'Create apartment'}
                extra={<Typography.Link onClick={() => history.goBack()}>Go back</Typography.Link>}
              >
                <Form.Item
                  required
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter apartment name',
                    },
                    {
                      min: 2,
                      message: 'Name should be at least 2 characters long',
                    },
                  ]}
                >
                  <Input placeholder="Enter your apartment name" />
                </Form.Item>
                <Form.Item
                  required
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the description',
                    },
                    {
                      min: 4,
                      message: 'Description should be at least 4 characters long',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Enter the description name" />
                </Form.Item>
                {/* when realtor is selecting the status type rather Available or Rented */}
                <Form.Item required label="Select" name="status">
                  <Select>
                    {apartmentStatuses.map((status) => (
                      <Select.Option key={status} value={status}>
                        {/* startCase will change the first letter to CAPITAL like if it is available then it'll change it to Available */}
                        {startCase(status)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Space size="large">
                  <Form.Item
                    required
                    name="lat"
                    label="Latitude"
                    rules={[
                      {
                        required: true,
                        // float value since coordinates can be in points
                        type: 'float',
                        message: `Latitude is required`,
                      },
                    ]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    required
                    name="lng"
                    label="Longitude"
                    rules={[
                      {
                        required: true,
                        type: 'float',
                        message: `Longitude is required`,
                      },
                    ]}
                  >
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Space>
                <br />
                <Space direction="vertical">
                  {/* while uploading apartment this will ask us if we wanted to upload apartment address by map location picker, enter google map link etc */}
                  <Typography.Title level={4}>Set location by</Typography.Title>
                  <Space size="middle">
                    {/* modalMap is in the form of object therefore we've used Object.keys() function */}
                    {Object.keys(modalMap).map((key) => (
                      <Button key={key} type="primary" onClick={() => setModal(key)}>
                        {modalMap[key]}
                      </Button>
                    ))}
                  </Space>
                </Space>

                <br />
                <br />
                {/* noFields is an ARRAY of object which have label name which can be Price, Room, Size and other values like min and max values for rooms, price and size */}
                {noFields.map((field) => (
                  <Form.Item
                    required
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    help={`${field.label} should in ${field.min} to ${field.max}`}
                    rules={[
                      {
                        required: true,
                        type: 'number',
                        message: `${field.label} is required`,
                      },
                      // {
                      //   min: field.min,
                      //   type: 'number',
                      //   message: `${field.label} is required`,
                      // },
                    ]}
                  >
                    <InputNumber min={field.min} max={field.max} />
                  </Form.Item>
                ))}
              </Card>
            </Form>
          )}
        </Col>
      </div>
    </Page>
  );
}

export default ApartmentFormPage;
