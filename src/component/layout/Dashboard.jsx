import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as MD from '@material-ui/core';
import { Link } from '@reach/router';
import Logo from '../misc/Logo';
import ShortText from '@material-ui/icons/ShortText';

const navbarWidth = 300;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    navbar: {
      width: navbarWidth,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    logo: {
      background: '#3f2c66',
    },
  })
);

export default function Dashboard({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MD.Box display="flex" width="100%">
        <MD.CssBaseline />
        <div className={classes.navbar}>
          <MD.List disablePadding={true}>
            <li>
              <MD.ListItem
                className={classes.logo}
                button
                component={Link}
                to={'/'}
              >
                <Logo />
              </MD.ListItem>
            </li>
            <MD.Divider />
            <li>
              <MD.ListItem button component={Link} to={'/edgeql'}>
                <MD.ListItemIcon>
                  <ShortText />
                </MD.ListItemIcon>
                <MD.ListItemText primary={'EdgeQL'} />
              </MD.ListItem>
            </li>
          </MD.List>
        </div>
        <div className={classes.main}>{children}</div>
      </MD.Box>
    </div>
  );
}
