import React, { useEffect, useState } from 'react';
import Dashboard from '../layout/Dashboard';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as MD from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: 550,
    },
  })
);

/**
 * Home screen
 */
export default function Home() {
  const classes = useStyles();

  return (
    <Dashboard>
      <MD.Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        Foo
      </MD.Box>
    </Dashboard>
  );
}
