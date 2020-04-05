import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
import { withTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
    },
  })
);

export default function TreeView(props) {
  const classes = useStyles();

  const Viewer = withTheme((props) => {
    const theme = props.theme;
    return (
      <ReactJson
        src={props.data}
        theme={{
          base00: theme.palette.background.default,
          base01: theme.palette.primary.dark,
          base02: theme.palette.divider, // left line
          base03: theme.palette.text.secondary,
          base04: theme.palette.warning.light, // items count
          base05: theme.palette.divider,
          base06: theme.palette.divider,
          base07: theme.palette.text.secondary, // brackets
          base08: theme.palette.error.dark,
          base09: theme.palette.error.dark,
          base0A: theme.palette.primary.main,
          base0B: theme.palette.primary.main,
          base0C: theme.palette.text.secondary,
          base0D: theme.palette.text.secondary, // arrow
          base0E: theme.palette.primary.main,
          base0F: theme.palette.primary.light,
        }}
      />
    );
  });

  return (
    <div className={classes.root}>
      <Viewer data={props.data} />
    </div>
  );
}

TreeView.propTypes = {};
