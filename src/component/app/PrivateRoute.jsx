import React from 'react';
import { Redirect } from '@reach/router';

import { AuthContext } from 'context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {({ hasAuth }) => {
        if (hasAuth) {
          return <Component {...rest} />;
        } else {
          return <Redirect to={'/login'} noThrow />;
        }
      }}
    </AuthContext.Consumer>
  );
}
