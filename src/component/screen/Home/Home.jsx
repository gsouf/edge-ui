import React from 'react';
import Dashboard from 'component/layout/Dashboard';
import * as MD from '@material-ui/core';

/**
 * Home screen
 */
export default function Home(props) {
  return (
    <Dashboard {...props}>
      <MD.Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <MD.Box color="text.disabled">Select a database to work with</MD.Box>
      </MD.Box>
    </Dashboard>
  );
}
