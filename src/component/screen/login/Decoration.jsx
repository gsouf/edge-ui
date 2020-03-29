import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 0,
      overflow: 'visible',
      display: 'flex',
      justifyContent: 'center',
    },
    item1: {
      width: '25rem',
      height: '25rem',
      transform: 'rotateX(65deg) rotateZ(45deg);',
      borderRadius: '3px',
      position: 'absolute',
      top: '-13rem',
      background: '#40025c',
      boxShadow: '0px 0px 12px 1px rgba(0, 0, 0, 0.7)',
    },
    item2: {
      width: '105vh',
      height: '105vh',
      minWidth: '45rem',
      minHeight: '45rem',
      position: 'absolute',
      top: '-2rem',
      transform: 'rotate(45deg)',
      bottom: 0,
      background: theme.palette.background.default,
    },
  })
);

export default function Decoration(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.item2} />
      </div>
      <div className={classes.root}>
        <div className={classes.item1} />
      </div>
    </>
  );
}

Decoration.propTypes = {};
