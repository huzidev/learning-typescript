import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'pages/NotFound';

import PageLoader from 'components/PageLoader';
import AuthGuard from 'components/AuthGuard';

import routes from './routes';

function AppRouter(): JSX.Element {
  return (
    <Router>
      {/* SUSPENSE will create a minor delay */}
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {routes.map(({ Component, ...route }) => {
            return (
              <Route
                {...route}
                key={route.path}
                component={() => (
                  <AuthGuard>
                    <Component />
                  </AuthGuard>
                )}
              />
            );
          })}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
