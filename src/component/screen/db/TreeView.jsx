import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
  })
);

export default function TreeView(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ReactJson src={props.results} theme="monokai" />
    </div>
  );
}

TreeView.propTypes = {};
