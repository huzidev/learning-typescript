import React from 'react';

import { roles, UserRole } from '@store/auth/types';
import ROUTE_PATHS from './paths';

const HomePage = React.lazy(() => import('pages/Home'));

interface AppRoute {
  path: string;
  exact?: boolean;
  role?: UserRole;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

const routes: AppRoute[] = {

}

export default routes;
