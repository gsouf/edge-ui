import React, { useState, useEffect } from 'react';
import * as MD from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './Routes';
import AuthContext from './context/AuthContext';
import EdgeDBClient from './service/EdgeDBClient';

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
    let client = new EdgeDBClient();
    client.hasConnection().then((r) => {
      if (r) {
        setHasAuth(true);
      }

      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={uiTheme}>
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
        <AuthContext.Provider value={{ hasAuth, setHasAuth }}>
          <Routes />
        </AuthContext.Provider>
      )}
    </ThemeProvider>
  );
}
