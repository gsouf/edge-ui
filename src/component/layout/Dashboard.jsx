import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as MD from '@material-ui/core';
import { Link } from '@reach/router';
import Logo from '../misc/Logo';
import Storage from '@material-ui/icons/Storage';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EdgeDBClient from '../../service/EdgeDBClient';
import AppContext from '../../context/AppContext';
import NavLink from './dashboard/NavLink';
import PropTypes from 'prop-types';

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
      background: theme.palette.primary.dark,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    disconnect: {
      '&:hover': {
        background: theme.palette.error.dark,
      },
    },
  })
);

export default function Dashboard({ children, location }) {
  const classes = useStyles();
  const { databases, setDatabases, setHasAuth } = useContext(AppContext);

  async function logout() {
    try {
      await EdgeDBClient.logout();
    } finally {
      navigate('/login');
      setDatabases(null);
      setDatabases(null);
      setHasAuth(false);
    }
  }

  return (
    <div className={classes.root}>
      <MD.Box display="flex" width="100%">
        <MD.CssBaseline />
        <div className={classes.navbar}>
          <MD.List disablePadding={true} className={classes.list}>
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
            <MD.ListItem>
              <MD.ListItemIcon>
                <Storage />
              </MD.ListItemIcon>
              <MD.ListItemText primary={'Databases'} />
              {databases && (
                <MD.Chip
                  size={'small'}
                  color="white"
                  label={databases.length}
                />
              )}
            </MD.ListItem>
            <MD.Collapse in={true} timeout="auto" unmountOnExit>
              {databases &&
                databases.map((db) => (
                  <MD.List component="div" disablePadding key={db}>
                    <NavLink
                      className={classes.nested}
                      to={`/db/${db}`}
                      location={location}
                    >
                      <MD.ListItemText primary={db} />
                    </NavLink>
                  </MD.List>
                ))}
              {!databases && (
                <MD.Box padding="0 1rem">
                  <MD.LinearProgress />
                </MD.Box>
              )}
            </MD.Collapse>
            <MD.Box component={'li'} flex={1} />
            <MD.Divider />
            <li>
              <MD.ListItem
                button
                className={classes.disconnect}
                onClick={logout}
              >
                <MD.ListItemIcon>
                  <HighlightOffIcon />
                </MD.ListItemIcon>
                <MD.ListItemText primary="disconnect" />
              </MD.ListItem>
            </li>
          </MD.List>
        </div>
        <div className={classes.main}>{children}</div>
      </MD.Box>
    </div>
  );
}

Dashboard.propTypes = {
  location: PropTypes.object.isRequired,
};
