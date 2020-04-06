import React, { useEffect, useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { IntrospectionContext } from 'context/IntrospectionContext';
import { AuthContext } from 'context/AuthContext';

/**
 * Aimed to be run in the app context
 * @param props
 * @return {*}
 * @constructor
 */
export default function AppManager({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const { hasAuth, setHasAuth } = useContext(AuthContext);
  const { resetDatabases, databases, reloadDatabases } = useContext(
    IntrospectionContext
  );

  //fetch databases on login
  useEffect(() => {
    if (hasAuth) {
      reloadDatabases();
    }
  }, [hasAuth]);

  return <>{children}</>;
}
