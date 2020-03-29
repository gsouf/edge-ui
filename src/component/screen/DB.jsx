import React, { useState } from 'react';
import Dashboard from '../layout/Dashboard';
import * as MD from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularButton from 'component/control/CircularButton';
import EdgeDBClient from 'service/EdgeDBClient';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) =>
  createStyles({
    edgeQlText: {
      '& textarea': {
        fontFamily: 'Monospace',
      },
    },
    actionZone: {
      display: 'flex',
      alignItems: 'center',
    },
    error: {
      flex: 1,
      margin: `0 ${theme.spacing(2)}px`,
    },
  })
);

/**
 * Home screen
 */
export default function DB(props) {
  const classes = useStyles();

  const [edgeQL, setEdgeQL] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const sendEdgeQL = async () => {
    setProcessing(true);
    setError(null);
    try {
      const data = await EdgeDBClient.edgeql(edgeQL);
      setResults(data);
      setProcessed(true);
      setTimeout(() => {
        setProcessed(false);
      }, 1000);
    } catch (e) {
      setError(e.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dashboard {...props}>
      <MD.Box
        display="flex"
        flexDirection="column"
        flex={1}
        justifyContent="flexStart"
        alignItems="stretch"
      >
        <MD.Box className={classes.textBox}>
          <MD.TextField
            autoFocus
            className={classes.edgeQlText}
            variant={'filled'}
            multiline
            fullWidth
            label={'EdgeQL'}
            value={edgeQL}
            inputProps={{
              onKeyDown: (e) => {
                if (e.ctrlKey && e.keyCode === 13) {
                  if (!processing) {
                    sendEdgeQL();
                  }
                }
              },
            }}
            onChange={(e) => setEdgeQL(e.target.value)}
          />
        </MD.Box>
        <MD.Box className={classes.actionZone}>
          <CircularButton
            onClick={sendEdgeQL}
            icon={<ArrowRightIcon />}
            color="primary"
            loading={processing}
            success={processed}
            disabled={!edgeQL || processing}
            label={'send edgeQL'}
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
        {results && <pre>{JSON.stringify(results)}</pre>}
      </MD.Box>
    </Dashboard>
  );
}
