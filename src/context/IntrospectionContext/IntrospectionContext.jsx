import React from 'react';

const IntrospectionContext = React.createContext({
  databases: null,
  reloadDatabases: () => {},
  resetDatabases: () => {},
});

export default IntrospectionContext;
