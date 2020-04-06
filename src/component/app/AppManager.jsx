import React, { useEffect, useContext } from 'react';
import AppContext from 'context/AppContext';
import { useSnackbar } from 'notistack';
import EdgeDBClient from 'service/EdgeDBClient';

/**
 * Aimed to be run in the app context
 * @param props
 * @return {*}
 * @constructor
 */
export default function AppManager(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { hasAuth, setDatabases } = useContext(AppContext);

  // fetch databases on login
  useEffect(() => {
    if (hasAuth) {
      setDatabases(null);
      EdgeDBClient.edgeql({ query: 'SELECT sys::Database.name' })
        .then((databases) => {
          setDatabases(
            databases.data.map((db) => ({
              name: db,
            }))
          );
        })
        .catch((e) => {
          enqueueSnackbar(`Cannot fetch db list: ${e.message}`, {
            variant: 'error',
          });
        });
    }
  }, [hasAuth]);

  return props.children;
}
