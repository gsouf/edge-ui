import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from './component/misc/PrivateRoute';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Login from 'component/screen/Login';
import Home from 'component/screen/Home';
import DB from 'component/screen/DB';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100%',
    },
  })
);

export default function Routes() {
  const classes = useStyles();
  return (
    <Router className={classes.root}>
      <Login path="/login" />
      <PrivateRoute path="/" component={Home} />
      <PrivateRoute path="db/:dbName" component={DB} />
    </Router>
  );
}
