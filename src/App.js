import React, { useState, useEffect, useContext } from 'react';
import * as MD from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './Routes';
import AppContext from './context/AppContext';
import EdgeDBClient from './service/EdgeDBClient';
import { SnackbarProvider, useSnackbar } from 'notistack';

// Inject styles
import 'typeface-roboto';
import './app.css';

// theme
const uiTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

/**
 * Aimed to be run in the app context
 * @param props
 * @return {*}
 * @constructor
 */
function AppManager(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { hasAuth, setDatabases } = useContext(AppContext);

  // fetch databases on login
  useEffect(() => {
    if (hasAuth) {
      setDatabases(null);
      EdgeDBClient.edgeql('SELECT sys::Database.name')
        .then((databases) => {
          setDatabases(databases.data);
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasAuth, setHasAuth] = useState(false);
  const [databases, setDatabases] = useState(null);

  // check connection on init
  useEffect(() => {
    EdgeDBClient.hasConnection().then((r) => {
      if (r) {
        setHasAuth(true);
      }

      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={uiTheme}>
      <SnackbarProvider maxSnack={8}>
        <MD.CssBaseline />

        {loading && (
          <MD.Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <MD.CircularProgress />
          </MD.Box>
        )}

        {!loading && (
          <AppContext.Provider
            value={{ hasAuth, setHasAuth, databases, setDatabases }}
          >
            <AppManager>
              <Routes />
            </AppManager>
          </AppContext.Provider>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
