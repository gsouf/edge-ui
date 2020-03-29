import React, { useState, useEffect } from 'react';
import * as MD from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
  })
);

export default function CircularButton(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  });

  useEffect(() => {
    if (loading !== props.loading) {
      if (props.loading === false) {
        setLoading(false);
      } else {
        // show a spinner after a short delay
        let timeout = setTimeout(() => {
          setLoading(true);
        }, 600);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [props.loading]);

  return (
    <div className={classes.wrapper}>
      <MD.Fab
        type={props.type}
        disabled={props.disabled || props.loading}
        aria-label={props.label}
        color={props.color}
        className={buttonClassname}
        onClick={props.onClick}
      >
        {props.success ? <CheckIcon /> : props.icon}
      </MD.Fab>
      {loading && (
        <MD.CircularProgress size={68} className={classes.fabProgress} />
      )}
    </div>
  );
}

CircularButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
};
