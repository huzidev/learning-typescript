import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  ColProps,
  Drawer,
  Dropdown,
  Grid,
  Menu,
  Row,
  Space,
  Tooltip,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  TableOutlined,
  MenuOutlined,
  BorderOutlined,
  DownOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';
import { hasPermission } from 'utils';
import { cx } from 'alias';

import Logo from 'components/Logo';

import './styles.less';

const variants = ['default', 'fixed'] as const;
type Variant = typeof variants[number];

export interface HeaderProps {
  variant?: Variant;
  fullWidth?: boolean;
}

function Header({ variant, fullWidth }: HeaderProps): JSX.Element {
  // Grid.useBreakpoint() is function from ant-design for responsiveness for medium devices and small devices
  const breakpoints = Grid.useBreakpoint();
  const history = useHistory();
  const auth = useAuth();
  // for HAMBURGER menu
  const [visible, setVisible] = useState(false);

  // to open (HAMBURGER) menu
  const showDrawer = () => {
    setVisible(true);
  };

  // to close (HAMBURGER) menu
  const onClose = () => {
    setVisible(false);
  };
  const responsive: ColProps = { span: 22, offset: 1 };
  if (!fullWidth) {
    responsive.xl = { span: 16, offset: 4 };
  }

  const me = auth.user?.id;

  // this menu will be shown on DROP-DOWN
  const menu = (
    <Menu>
      <Menu.Item
        key="view"
        icon={<UserOutlined />}
        onClick={() => history.push(`${ROUTE_PATHS.VIEW_PROFILE}${me}`)}
      >
        View Profile
      </Menu.Item>
      <Menu.Item
        key="edit"
        icon={<UserOutlined />}
        onClick={() => history.push(`${ROUTE_PATHS.USER_UPDATE}me`)}
      >
        Edit Profile
      </Menu.Item>
      <Menu.Item
        key="edit"
        icon={<SettingOutlined />}
        onClick={() => history.push(`${ROUTE_PATHS.USER_SETTING}me`)}
      >
        Preferences
      </Menu.Item>
      <Menu.Divider key="divider" />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  // means if user is verified then user can see all the header including map view, view profile etc and if user is admin then user can have access of manage users as well
  const links = auth.user?.isVerified && (
    <>
      <Button
        type="text"
        icon={<BorderOutlined />}
        onClick={() => history.push(ROUTE_PATHS.MAP_VIEW)}
      >
        Map View
      </Button>
      {/* means this page will only be visible when admin is loggedIn */}
      {hasPermission('admin', auth.user.role) && ( // hasPermission takes 2 parameters first is allowedRule means this page is only allowed for admin and second parameter is myRole means what current user's role is
        <Button
          type="text"
          icon={<UserSwitchOutlined />}
          onClick={() => history.push(ROUTE_PATHS.USERS + 1)} // +1 means it'll send admin to first page of manage users by default since their is already 20+ pages
        >
          Manage Users
        </Button>
      )}
      {/* since we just gave access to realtor only the access will also be given to admin adn super-admin automatically because we've created a logic that allowedRole >= myRole since their allowedRole is for realtor which is 1 and role for admin and super-admin is greater than 1 mean greater than allowedRole */}
      {hasPermission('realtor', auth.user.role) && (
        <Button
          type="text"
          icon={<TableOutlined />}
          onClick={() =>
            history.push(
              (hasPermission('admin', auth.user?.role) // means if admin is loggedIn then we'll show all the apartments available and if realtor is loggedIn then only apartment of realtor will be shown
                ? ROUTE_PATHS.APARTMENTS
                : ROUTE_PATHS.APARTMENTS_BY_ME) + 1, // this +1 is applicable for ROUTE_PATHS.APARTMENTS and ROUTE_PATHS.APARTMENTS_BY_ME for both since it is at outside of the bracket
            )
          }
        >
          Manage Apartments
        </Button>
      )}
      {/* when user Hover on the profile name then this DROP-DOWN menu will be shown and it'll show all the data */}
      {/* since we've defined overlay={menu} and (menu) is already define above which have all the data */}
      {breakpoints.md ? (
        <Dropdown overlay={menu} placement="bottomCenter" {...(!breakpoints.md ? {} : {})}>
          <Button type="text" icon={<UserOutlined />}>
            {auth.user.name}
          </Button>
        </Dropdown>
      ) : (
        <Dropdown
          // trigger = Click method will make ours drop down button to clickable so when user is loggedIn from mobile user can access drop down with click instead of HOVER
          trigger={['click']}
          overlay={menu}
          placement="bottomCenter"
          {...(!breakpoints.md ? {} : {})}
        >
          <Button type="text" icon={<UserOutlined />}>
            {auth.user.name}
            <DownOutlined />
          </Button>
        </Dropdown>
      )}
    </>
  );
  return (
    <>
      <Card id={cx('page-header')} className={cx(variant, { 'no-padding': fullWidth })}>
        <Col {...responsive}>
          <Row justify="space-between" align="middle">
            {/* Happy homes logo */}
            <Logo
              level={4}
              className="logo"
              onClick={() => history.push({ pathname: ROUTE_PATHS.DASHBOARD })}
            />
            {/* if user is not banned and if user is at medium screen then show all the the LINKS to the user like map view, manage apartments, manage user, and view profile */}
            {!auth.user?.isBanned && (
              <Space>
                {breakpoints.md ? (
                  links // links are defined above which includes map view, manage apartments, view profile
                ) : (
                  // this is an else condition when user is in mobile screen then show (HAMBURGER) menu with tooltip (Drawer)
                  <Tooltip title="Drawer">
                    <Button
                      // onClick showDrawer function will runs and changes the setVisible to true from false
                      onClick={showDrawer}
                      size="middle"
                      shape="circle"
                      icon={<MenuOutlined style={{ fontSize: '14px' }} />}
                    />
                  </Tooltip>
                )}
              </Space>
            )}
          </Row>
        </Col>
      </Card>
      {/* if user is NOT on medium screen */}
      {!breakpoints.md && auth.user && (
        // this is for (HAMBURGER) menu onClose the setVisible state will changes from true to false
        // placement="right" means (HAMBURGER) will appears from right side
        <Drawer title={auth.user?.name} placement="right" onClose={onClose} visible={visible}>
          {links}
        </Drawer>
      )}
    </>
  );
}

Header.defaultProps = {
  variant: variants[0],
  fullWidth: false,
};

export default Header;
