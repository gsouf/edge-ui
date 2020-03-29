import React from 'react';
import { Redirect } from '@reach/router';

import AppContext from 'context/AppContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuth = true;

  return (
    <AppContext.Consumer>
      {({ hasAuth }) => {
        if (hasAuth) {
          return <Component {...rest} />;
        } else {
          return <Redirect to={'/login'} noThrow />;
        }
      }}
    </AppContext.Consumer>
  );
}
