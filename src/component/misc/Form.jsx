import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldset: {
      margin: 0,
      padding: 0,
      border: 0,
    },
  })
);

export default function Form(props) {
  const classes = useStyles();

  const { disabled, children, ...rest } = props;

  return (
    <form {...rest}>
      <fieldset className={classes.fieldset} disabled={disabled}>
        {children}
      </fieldset>
    </form>
  );
}
