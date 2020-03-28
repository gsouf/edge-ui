import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as MD from '@material-ui/core';
import { Link } from '@reach/router';

const drawerWidth = 200;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
  })
);

export default function Dashboard({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MD.AppBar className={classes.appBar} position="fixed">
        <MD.Toolbar />
      </MD.AppBar>
      <MD.Box display="flex" width="100%">
        {/* see https://material-ui.com/components/drawers/#persistent-drawer */}
        <MD.Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          <MD.List>
            <MD.Divider />
            <li>
              <MD.ListItem button component={Link} to={'/'}>
                <MD.ListItemText primary={'foo'} />
              </MD.ListItem>
            </li>
          </MD.List>
        </MD.Drawer>
        <div className={classes.main}>
          <div className={classes.toolbar} />
          {children}
        </div>
      </MD.Box>
    </div>
  );
}
