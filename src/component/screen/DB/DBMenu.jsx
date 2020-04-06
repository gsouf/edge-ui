import React, { useState, useEffect } from 'react';
import * as MD from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Storage from '@material-ui/icons/Storage';
import EdgeDBClient from 'service/EdgeDBClient';

const useStyles = makeStyles((theme) =>
  createStyles({
    menuProgress: {
      margin: theme.spacing(2),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

async function loadTypes(database) {
  const stdModules = [
    'std',
    'schema',
    'math',
    'sys',
    'cfg',
    'cal',
    'stdgraphql',
  ];

  const query = `WITH MODULE schema
SELECT ObjectType {
is_from_alias ,
    name,
    \`extending\` := to_str(array_agg(.ancestors.name), ', '),
    links: {
        name,
    },
    properties: {
        name,
    }
}
FILTER
      NOT .is_from_alias
  # AND NOT .is_compound_type // TODO enable with next version of EdgeDB
  AND NOT (re_test("^(${stdModules.join('|')})::", .name))
ORDER BY .name;`;

  return await EdgeDBClient.edgeql({ query, database });
}

export default function DBMenu(props) {
  const classes = useStyles();

  const [types, setTypes] = useState(null);

  useEffect(() => {
    setTypes(null);
    loadTypes(props.dbName).then((r) => {
      setTypes(r.data);
    });
  }, [props.dbName]);

  return (
    <div className={classes.root}>
      <MD.List disablePadding={true}>
        <MD.ListItem>
          <MD.ListItemIcon>
            <Storage />
          </MD.ListItemIcon>
          <MD.ListItemText primary={'Types'} />
          {types === null && <MD.CircularProgress size={14} color="inherit" />}
          {types && <MD.Chip size={'small'} label={types.length} />}
        </MD.ListItem>
        <MD.Collapse in={true} timeout="auto" unmountOnExit>
          {types &&
            types.length > 0 &&
            types.map((type) => (
              <MD.List component="div" disablePadding key={type.name}>
                <MD.ListItem className={classes.nested} button>
                  <MD.ListItemText primary={type.name} />
                </MD.ListItem>
              </MD.List>
            ))}
        </MD.Collapse>
      </MD.List>
    </div>
  );
}

DBMenu.propTypes = {
  dbName: PropTypes.string.isRequired,
};
