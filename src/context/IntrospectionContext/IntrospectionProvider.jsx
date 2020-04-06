import React, { useState, useRef } from 'react';
import EdgeDBClient from 'service/EdgeDBClient';
import runIntrospection from 'utils/runIntrospection';
import IntrospectionContext from './IntrospectionContext';
import { useSnackbar } from 'notistack';

export default function IntrospectionProvider({ children }) {
  const [databases, setDatabases] = useState(null);
  const databasesRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const updateDatabases = (value) => {
    setDatabases(value);
    databasesRef.current = value;
  };

  /**
   * Reloads all databases
   */
  const reloadDatabases = () => {
    EdgeDBClient.edgeql({ query: 'SELECT sys::Database.name' })
      .then((databases) => {
        // set databaes
        updateDatabases(
          databases.data.reduce((dbs, db) => {
            dbs[db] = {
              name: db,
              types: null,
            };
            return dbs;
          }, {})
        );

        // run introspection on individual databases
        databases.data.forEach(async (database) => {
          try {
            const response = await runIntrospection(database);
            updateDatabases({
              ...databasesRef.current,
              [database]: {
                ...databasesRef.current[database],
                types: response.data,
              },
            });
          } catch (e) {
            console.log(e);
            updateDatabases({
              ...databasesRef.current,
              [database]: {
                name: database,
                error: e.message,
              },
            });
          }
        });
      })
      .catch((e) => {
        enqueueSnackbar(`Cannot fetch db list: ${e.message}`, {
          variant: 'error',
        });
      });
  };

  const resetDatabases = () => {
    setDatabases(null);
  };

  return (
    <IntrospectionContext.Provider
      value={{
        databases,
        reloadDatabases,
        resetDatabases,
      }}
    >
      {children}
    </IntrospectionContext.Provider>
  );
}
