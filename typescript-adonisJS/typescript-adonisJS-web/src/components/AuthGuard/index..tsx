import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UrlPattern from 'url-pattern';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';

import routes from 'Router/routes';

import PageLoader from 'components/PageLoader';

import { hasPermission } from 'utils';

function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const [state, setState] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const currentPath = history.location.pathname;
  const route = routes.find((r) =>
    r.exact ? r.path === currentPath : new UrlPattern(r.path).match(currentPath),
  );
  const isProtected = !!route?.role;
  useEffect(() => {
    if (!auth.initState.init && !auth.initState.loading) {
      auth.initUser();
      return;
    }
    if (!auth.initState.init) {
      return;
    }
    if (isProtected && !auth.userData) {
      history.replace('/');
    } else if (auth.userData) {
      const { isVerified, isBanned } = auth.userData;
      if (isBanned && isProtected && route.path !== ROUTE_PATHS.BANNED_USER) {
        history.replace(ROUTE_PATHS.BANNED_USER);
      } else if (isVerified && route?.path === ROUTE_PATHS.VERIFY_USER) {
        history.replace(ROUTE_PATHS.DASHBOARD);
      } else if (isVerified && isProtected && !hasPermission(route.role, auth.userData.role)) {
        history.replace(ROUTE_PATHS.DASHBOARD);
      } else if (!isVerified && route?.path !== ROUTE_PATHS.VERIFY_USER) {
        history.replace(ROUTE_PATHS.VERIFY_USER);
      } else if (!isProtected) {
        history.replace(ROUTE_PATHS.DASHBOARD);
      } else {
        setState(true);
      }
    } else {
      setState(true);
    }
  }, [auth.userData, auth.initState]);
  if (!state) {
    return <PageLoader />;
  }
  return children;
}
export default AuthGuard;
