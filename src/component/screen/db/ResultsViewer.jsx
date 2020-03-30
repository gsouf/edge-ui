import React, { useState, useEffect } from 'react';
import * as MD from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TreeView from './TreeView';
import RawView from './RawView';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      width: '8rem',
      maxWidth: '8rem',
      height: '100%',
    },
    tab: {
      width: `100%`,
      maxWidth: '100%',
      minWidth: '5rem',
      '& > *': {
        textAlign: 'right',
        display: 'block',
      },
    },
    resultsContainer: {
      padding: `0 ${theme.spacing(2)}px`,
    },
  })
);

export default function ResultsViewer(props) {
  const classes = useStyles();

  const [viewMode, setViewMode] = useState('tree');

  return (
    <div className={classes.root}>
      {!props.results && <div />}
      {props.results && (
        <>
          <MD.Tabs
            className={classes.tabs}
            orientation="vertical"
            indicatorColor="primary"
            onChange={(e, newValue) => setViewMode(newValue)}
            value={viewMode}
          >
            <MD.Tab
              className={classes.tab}
              fullWidth
              label={'Tree view'}
              value="tree"
            />
            <MD.Tab className={classes.tab} label={'Raw JSON'} value="raw" />
          </MD.Tabs>
          <MD.Box className={classes.resultsContainer}>
            {(() => {
              switch (viewMode) {
                case 'tree':
                  return <TreeView data={props.results.data} />;
                case 'raw':
                  return <RawView data={props.results.data} />;
              }
            })()}
          </MD.Box>
        </>
      )}
    </div>
  );
}

ResultsViewer.propTypes = {};
