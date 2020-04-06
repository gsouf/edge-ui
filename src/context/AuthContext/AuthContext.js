import React from 'react';

const AuthContext = React.createContext({
  hasAuth: false,
  setHasAuth: () => {},
});

export default AuthContext;
