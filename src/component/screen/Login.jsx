import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as MD from '@material-ui/core';
import Logo from '../misc/Logo';
import Decoration from './login/Decoration';
import GitHub from '@material-ui/icons/GitHub';
import LoginForm from './login/LoginForm';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100%',
      background:
        'radial-gradient(circle at center center,#40025c 60%,#1c104c 100%)',
    },
    container: {
      paddingTop: '1rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: '2',
    },
    decorator: {
      position: 'fixed',
      zIndex: '1',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
    paper: {
      flex: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      '& > form': {
        '& input': {
          background: theme.palette.background.default,
        },
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    footer: {
      color: theme.palette.text.disabled,
      textAlign: 'center',
      marginTop: '3rem',
    },
  })
);

/**
 * Home screen
 */
export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.decorator}>
        <Decoration />
      </div>
      <MD.Container
        className={classes.container}
        component="main"
        maxWidth="xs"
      >
        <MD.Typography component="h1" variant="h5">
          <Logo />
        </MD.Typography>
        <div className={classes.paper}>
          <LoginForm />
          <div className={classes.footer}>
            <div>
              EdgeDB Web UI is on{' '}
              <MD.Link href="https://github.com/gsouf/edgedb-web-ui">
                Github <GitHub />
              </MD.Link>
            </div>
            <div>
              Edge DB Web UI is a community project that has no affiliations
              with EdgeDB Inc.
            </div>
          </div>
        </div>
      </MD.Container>
    </div>
  );
}
