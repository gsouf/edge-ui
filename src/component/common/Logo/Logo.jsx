import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      color: '#FFF',

      '& > *': {
        margin: '0 0.2rem',
      },
    },
  })
);

export default function Logo(props) {
  const classes = useStyles();

  const height = 60;
  const thickness = 5;

  return (
    <div className={classes.root}>
      <div>EDGE</div>
      <svg id="chart" width={thickness} height={height}>
        <line
          x1="0"
          y1="0"
          x2="0"
          y2={height}
          style={{
            stroke: '#FFF',
            strokeWidth: thickness,
          }}
        />
      </svg>
      <div>UI</div>
    </div>
  );
}
