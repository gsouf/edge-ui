import React, { useState } from 'react';
import * as MD from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularButton from 'component/common/CircularButton';
import EdgeDBClient from 'service/EdgeDBClient';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import StorageIcon from '@material-ui/icons/Storage';
import PropTypes from 'prop-types';
import CodeEditor from 'component/common/CodeEditor';

const useStyles = makeStyles((theme) =>
  createStyles({
    actionZone: {
      display: 'flex',
      alignItems: 'center',
    },
    error: {
      flex: 1,
      margin: `0 ${theme.spacing(2)}px`,
    },
    bar: {
      background: theme.palette.background.default,
      height: '2rem',
      fontFamily: 'Monospace',
      display: 'flex',
      alignItems: 'center',
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
      borderBottom: `1px solid ${theme.palette.divider}`,

      '& > *': {
        marginRight: theme.spacing(4),
      },
    },
    barlabel: {
      fontSize: theme.typography.fontSize,
    },
    monospace: {
      fontFamily: 'Monospace',
    },
  })
);

/**
 * Home screen
 */
export default function Query(props) {
  const classes = useStyles();

  const [edgeQL, setEdgeQL] = useState('SELECT 1 + 1');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState(null);
  const [isExecute, setIsExecute] = useState(false);

  const sendEdgeQL = async (edgeQL) => {
    props.setResults(null);
    setProcessing(true);
    setError(null);
    try {
      const data = await EdgeDBClient.edgeql({
        query: edgeQL,
        database: props.dbName,
        isExecute,
      });
      props.setResults(data);
      setProcessed(true);
      setTimeout(() => {
        setProcessed(false);
      }, 1700);
    } catch (e) {
      setError(e.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <MD.Box
      display="flex"
      flexDirection="column"
      justifyContent="flexStart"
      alignItems="stretch"
    >
      <MD.Box className={classes.textBox}>
        <CodeEditor
          text={edgeQL}
          setText={(text) => {
            setEdgeQL(text);
          }}
          requestSubmit={sendEdgeQL}
        />
      </MD.Box>
      <MD.Box className={classes.bar}>
        <div>
          <MD.Chip
            size="small"
            color={'primary'}
            className={classes.monospace}
            icon={<StorageIcon />}
            label={props.dbName}
          />
        </div>

        <div>
          <MD.Tooltip
            title={
              'Allows to execute multiple statement at once (ie transactions) but does not produce any output.'
            }
            arrow
          >
            <MD.FormControlLabel
              className={classes.barlabel}
              control={
                <MD.Switch
                  size="small"
                  checked={isExecute}
                  onChange={(e) => setIsExecute(e.target.checked)}
                  name="isExecute"
                  color="primary"
                />
              }
              label="Execute mode"
            />
          </MD.Tooltip>
        </div>
      </MD.Box>
      <MD.Box className={classes.actionZone}>
        <CircularButton
          onClick={() => sendEdgeQL(edgeQL)}
          icon={<ArrowRightIcon />}
          color="primary"
          loading={processing}
          success={processed}
          disabled={!edgeQL || processing}
        />
        {error && (
          <Alert
            className={classes.error}
            severity="error"
            variant="filled"
            action={
              <MD.Button
                color="inherit"
                size="small"
                onClick={() => setError(null)}
              >
                <CloseIcon />
              </MD.Button>
            }
          >
            {error}
          </Alert>
        )}
      </MD.Box>
    </MD.Box>
  );
}

Query.propTypes = {
  dbName: PropTypes.string.isRequired,
  setResults: PropTypes.func.isRequired,
};
