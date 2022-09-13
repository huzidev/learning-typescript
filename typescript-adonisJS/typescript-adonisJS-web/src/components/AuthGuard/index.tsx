import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// to create URL
import UrlPattern from 'url-pattern';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';

// routes have all the components with their paths with defined role that which role has access of which path
// routes are JUST LIKE we did for reactJS <Router><Routes></Routes></Router> exact path etc
import routes from 'Router/routes';

import PageLoader from 'components/PageLoader';

import { hasPermission } from 'utils';

interface AuthGuardProps {
  children: JSX.Element;
}

function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const [state, setState] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  // currentPath will tells the exact URL like if user is at home page then current path will be /home
  const currentPath = history.location.pathname;
  const route = routes.find((r) =>
    // .exact is a boolean and is already defined in ours (routes) file exact is like we did in react-router-dom exact path={}
    // r.path is the path for components defined already in (routes) files
    // since exact is a BOOLEAN value exact is true for some specific path if exact is not used then we (create new UrlPattern)
    r.exact ? r.path === currentPath : new UrlPattern(r.path).match(currentPath),
  );

  // isProtected takes route.role are the roles like for realtor, admins, super-admin which is already defined in (routes) file
  // in brief (isProtected) is like hasPermission
  const isProtected = !!route?.role;
  console.log('URL URL URL CURRENT PATH', currentPath);
  console.log('ROUTE ROLE URL', route?.role);
  console.log('URL URL AUTH USER', auth.user);
  console.log('URL URL STATE', state);
  useEffect(() => {
    if (!auth.initState.init && !auth.initState.loading) {
      auth.initUser();
      return;
    }
    if (!auth.initState.init) {
      return;
    }

    // means if route is permitted for specific user and other user with lesser role try to access the path then link that user to home-page
    if (isProtected && !auth.user) {
      history.replace('/');
    } // auth.user bring all the information of loggedIn user like role, name, id etc
    else if (auth.user) {
      // DESTRUCTURING
      const { isVerified, isBanned } = auth.user;
      // if user is BANNED and have no access and USER IS NOT AT THE PATH OF BANNED USER therefore we've used (route.path !== ROUTE_PATHS.BANNED_USER) this indicates if user is BANNED and user is not at the path of BANNED user then simply link that user to BANNED USER PATH
      if (isBanned && isProtected && route.path !== ROUTE_PATHS.BANNED_USER) {
        history.replace(ROUTE_PATHS.BANNED_USER);
      } // if user is VERIFIED and user is at the path of VERIFY USER then link the user to dashboard (home-page)
      else if (isVerified && route?.path === ROUTE_PATHS.VERIFY_USER) {
        // If user is verified then redirects user to the dashboard
        history.replace(ROUTE_PATHS.DASHBOARD);
      } // if user is verified and isProtected like user is client or realtor but PERMISSION is only for admins then link the user to home-page
      else if (isVerified && isProtected && !hasPermission(route.role, auth.user.role)) {
        // If user Doesn't have permission to access the route then redirects user to the dashboard
        history.replace(ROUTE_PATHS.DASHBOARD);
      } // If user is not verified then redirects user to the email verification screen
      else if (!isVerified && route?.path !== ROUTE_PATHS.VERIFY_USER) {
        history.replace(ROUTE_PATHS.VERIFY_USER);
      } // is NOT PROTECTED means role have no access
      else if (!isProtected) {
        history.replace(ROUTE_PATHS.DASHBOARD);
      } // we've used (setState true) so after checking all this condition the setState will be true OTHERWISE user can't see anything except LOADING SCREEN
      else {
        setState(true);
      }
    } // we've used (setState true) so after checking all this condition the setState will be true OTHERWISE user can't see anything except LOADING SCREEN
    else {
      setState(true);
    }
    // since we've used all these conditions in useEffect therefore initially the setState condition is false therefore user will see loading page for minor time but after checking conditions the setState will be true
  }, [auth.user, auth.initState]);

  // if (state is false) then runs a loader
  if (!state) {
    return <PageLoader />;
  }

  return children;
}

export default AuthGuard;
