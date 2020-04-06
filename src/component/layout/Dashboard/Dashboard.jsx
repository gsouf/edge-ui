import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as MD from '@material-ui/core';
import { Link } from '@reach/router';
import Logo from 'component/common/Logo';
import StorageIcon from '@material-ui/icons/Storage';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import WarningIcon from '@material-ui/icons/Warning';
import EdgeDBClient from '../../../service/EdgeDBClient';
import { IntrospectionContext } from 'context/IntrospectionContext';
import { AuthContext } from 'context/AuthContext';
import NavLink from './NavLink';
import PropTypes from 'prop-types';

const navbarWidth = 300;
const menuNestingFactor = 3;
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
      paddingLeft: theme.spacing(menuNestingFactor),
    },
    nested2: {
      paddingLeft: theme.spacing(menuNestingFactor * 2),
    },
    nested3: {
      paddingLeft: theme.spacing(menuNestingFactor * 3),
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
    listIcon: {
      minWidth: 'initial',
      marginRight: theme.spacing(1),
    },
    listHeader: {
      background: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  })
);

export default function Dashboard({ children, location }) {
  const classes = useStyles();
  const { databases, resetDatabases } = useContext(IntrospectionContext);
  const { setHasAuth } = useContext(AuthContext);

  async function logout() {
    try {
      await EdgeDBClient.logout();
    } finally {
      navigate('/login');
      resetDatabases();
      setHasAuth(false);
    }
  }

  const databasesList = databases ? Object.keys(databases) : null;

  return (
    <div className={classes.root}>
      <MD.Box display="flex" width="100%">
        <MD.CssBaseline />
        <div className={classes.navbar}>
          <MD.List disablePadding={true} className={classes.list} dense>
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
            <MD.ListItem className={classes.listHeader}>
              <MD.ListItemText primary={'Databases'} />
              {databasesList && (
                <MD.Chip
                  size={'small'}
                  color="default"
                  label={databasesList.length}
                />
              )}
            </MD.ListItem>
            <MD.Collapse in={true} timeout="auto" unmountOnExit>
              {databasesList &&
                databasesList.map((dbName) => {
                  const db = databases[dbName];
                  return (
                    <MD.List component="div" disablePadding key={db.name} dense>
                      <NavLink
                        className={classes.nested}
                        to={`/db/${db.name}`}
                        location={location}
                      >
                        <MD.ListItemIcon className={classes.listIcon}>
                          <StorageIcon fontSize="small" />
                        </MD.ListItemIcon>
                        <MD.ListItemText primary={db.name} />

                        {db.error && (
                          <MD.Tooltip title={db.error} arrow>
                            <WarningIcon color={'error'} fontSize={'small'} />
                          </MD.Tooltip>
                        )}
                      </NavLink>
                      {!db.error && (
                        <MD.Collapse in={true} timeout="auto" unmountOnExit>
                          <MD.List disablePadding={true} dense>
                            <MD.ListItem className={classes.nested2}>
                              <MD.ListItemText primary={'Types'} />
                              {db.types === null && (
                                <MD.CircularProgress
                                  size={14}
                                  color="inherit"
                                />
                              )}
                              {db.types && (
                                <MD.Chip
                                  size={'small'}
                                  label={db.types.length}
                                />
                              )}
                            </MD.ListItem>
                            <MD.Collapse in={true} timeout="auto" unmountOnExit>
                              {db.types &&
                                db.types.length > 0 &&
                                db.types.map((type) => (
                                  <MD.List
                                    component="div"
                                    disablePadding
                                    key={type.name}
                                    dense
                                  >
                                    <MD.ListItem
                                      className={classes.nested3}
                                      button
                                    >
                                      <MD.ListItemText primary={type.name} />
                                    </MD.ListItem>
                                  </MD.List>
                                ))}
                            </MD.Collapse>
                          </MD.List>
                        </MD.Collapse>
                      )}
                    </MD.List>
                  );
                })}
              {!databasesList && (
                <MD.Box padding="1rem">
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
