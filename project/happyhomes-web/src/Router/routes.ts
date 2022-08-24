import React from 'react';

import { roles, UserRole } from '@store/auth/types';
import ROUTE_PATHS from './paths';

// React.lazy allows to render a dynamic import as a normal component
// one more thing (lazy) do is that it'll load that component which wanted to load like if user clicked on home page it'll load home page with some delay
const HomePage = React.lazy(() => import('pages/Home'));
const UsersPage = React.lazy(() => import('pages/Users'));
const MapViewPage = React.lazy(() => import('pages/MapView'));
const UserFormPage = React.lazy(() => import('pages/UserForm'));
const DashboardPage = React.lazy(() => import('pages/Dashboard'));
const BannedUserPage = React.lazy(() => import('pages/BannedUser'));
const ApartmentsPage = React.lazy(() => import('pages/Apartments'));
const VerifyUserPage = React.lazy(() => import('pages/VerifyUser'));
const ViewProfilePage = React.lazy(() => import('pages/ViewProfile'));
const ApartmentViewPage = React.lazy(() => import('pages/ApartmentView'));
const ApartmentFormPage = React.lazy(() => import('pages/ApartmentForm'));
const ResetPasswordPage = React.lazy(() => import('pages/ResetPassword'));
const SendResetPasswordPage = React.lazy(() => import('pages/SendResetPassword'));

interface AppRoute {
  path: string;
  exact?: boolean;
  role?: UserRole;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

// EXACT TRUE is define at all those places which is ACCESSIBLE by every user like client, admin, realtor for example reset password page, banned user page these are the page which is ACCESSIBLE to every user
// and restricted pages like updateUserById is only ACCESSIBLE for admin therefore we didn't used exact true their and createApartments
const routes: AppRoute[] = [
  {
    exact: true,
    Component: HomePage,
    path: ROUTE_PATHS.HOME,
  },
  {
    // role [0] for client and for realtor, admin and super-admin it'll works automatically because hasPermission logic says role >= allowedRole since 0 is greater than 1 to 3 and 1 is for realtor and 3 is for super-admin
    exact: true,
    role: roles[0],
    Component: BannedUserPage,
    path: ROUTE_PATHS.BANNED_USER,
  },
  {
    exact: true,
    role: roles[0],
    Component: MapViewPage,
    path: ROUTE_PATHS.MAP_VIEW,
  },
  {
    exact: true,
    role: roles[0],
    Component: DashboardPage,
    path: ROUTE_PATHS.DASHBOARD,
  },
  {
    exact: true,
    role: roles[0],
    Component: VerifyUserPage,
    path: ROUTE_PATHS.VERIFY_USER,
  },
  {
    exact: true,
    Component: SendResetPasswordPage,
    path: ROUTE_PATHS.SEND_RESET_PASSWORD,
  },
  {
    exact: true,
    Component: ResetPasswordPage,
    path: ROUTE_PATHS.RESET_PASSWORD,
  },
  {
    // we have not used (exact: true) here even this page is ACCESSIBLE because (params) is used here (:id) if we uses (params like :id, :page) then we don't uses exact
    role: roles[0],
    Component: ViewProfilePage,
    path: `${ROUTE_PATHS.VIEW_PROFILE}:id`,
  },
  {
    // so only admin and super-admin can create new user because admin role is 2 and super-admin role is 3
    role: roles[2],
    Component: UsersPage,
    path: `${ROUTE_PATHS.USERS}:page`,
  },
  {
    role: roles[2],
    Component: UserFormPage,
    path: ROUTE_PATHS.USER_CREATE,
  },
  {
    exact: true,
    role: roles[0],
    Component: UserFormPage,
    path: `${ROUTE_PATHS.USER_UPDATE}me`,
  },
  {
    exact: true,
    role: roles[0],
    Component: UserFormPage,
    path: `${ROUTE_PATHS.USER_SETTING}me`,
  },
  {
    role: roles[2],
    Component: UserFormPage,
    path: `${ROUTE_PATHS.USER_UPDATE}:id`,
  },

  {
    role: roles[0],
    Component: ApartmentViewPage,
    path: `${ROUTE_PATHS.APARTMENT_VIEW}:id`,
  },
  {
    role: roles[1],
    Component: ApartmentsPage,
    path: `${ROUTE_PATHS.APARTMENTS_BY_ME}:page`,
  },
  {
    role: roles[2],
    Component: ApartmentsPage,
    path: `${ROUTE_PATHS.APARTMENTS}:page`,
  },
  {
    role: roles[1],
    Component: ApartmentFormPage,
    path: ROUTE_PATHS.APARTMENT_CREATE,
  },
  {
    role: roles[1],
    Component: ApartmentFormPage,
    path: `${ROUTE_PATHS.APARTMENT_UPDATE}:id`,
  },
  // {
  //   exact: true,
  //   role: roles[0],
  //   Component: UserFormPage,
  //   path: `${ROUTE_PATHS.USER_UPDATE}me`,
  // },
  // {
  //   role: roles[2],
  //   Component: UserFormPage,
  //   path: `${ROUTE_PATHS.USER_UPDATE}:id`,
  // },
];

export default routes;
