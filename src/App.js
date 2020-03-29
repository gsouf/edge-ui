import React, { useState, useEffect } from 'react';
import * as MD from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './Routes';
import AppContext from './context/AppContext';
import EdgeDBClient from './service/EdgeDBClient';
import { SnackbarProvider } from 'notistack';

// Inject styles
import 'typeface-roboto';
import './app.css';

// theme
const uiTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasAuth, setHasAuth] = useState(false);

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
          <AppContext.Provider value={{ hasAuth, setHasAuth }}>
            <Routes />
          </AppContext.Provider>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
