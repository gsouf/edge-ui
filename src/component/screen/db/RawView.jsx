import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
  })
);

export default function RawView(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <pre>{JSON.stringify(props.results, null, 2)}</pre>
    </div>
  );
}

RawView.propTypes = {};
