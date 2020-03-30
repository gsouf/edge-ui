import React, { useState } from 'react';
import Dashboard from '../layout/Dashboard';
import * as MD from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ResultsViewer from './db/ResultsViewer';
import Query from './db/Query';
import DBMenu from './db/DBMenu';

const useStyles = makeStyles((theme) =>
  createStyles({
    dataArea: {
      flex: 1,
      display: 'flex',
      alignItems: 'stretch',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    resultsViewer: {
      flex: 1,
    },
    dbMenu: {
      width: '15rem',
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  })
);

/**
 * Home screen
 */
export default function DB(props) {
  const classes = useStyles();
  const [results, setResults] = useState(null);

  return (
    <Dashboard {...props}>
      <MD.Box
        display="flex"
        flexDirection="column"
        flex={1}
        justifyContent="flexStart"
        alignItems="stretch"
      >
        <Query setResults={setResults} dbName={props.dbName} />

        <MD.Box className={classes.dataArea}>
          <MD.Box className={classes.resultsViewer}>
            <ResultsViewer results={results} />
          </MD.Box>
          <MD.Box className={classes.dbMenu}>
            <DBMenu dbName={props.dbName} />
          </MD.Box>
        </MD.Box>
      </MD.Box>
    </Dashboard>
  );
}
