import React, { useContext, useState } from 'react';
import * as MD from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { navigate } from '@reach/router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import EdgeDBClient from 'service/EdgeDBClient';
import Form from 'component/misc/Form';
import AppContext from 'context/AppContext';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    address: {
      display: 'flex',
      '& > *:last-child': {
        width: '7rem',
        marginLeft: theme.spacing(1),
      },
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    successButton: {
      '&:disabled': {
        color: '#FFF',
        background: green[500],
      },
    },
  })
);

export default function LoginForm(props) {
  const classes = useStyles();

  const { setHasAuth } = useContext(AppContext);
  const [user, setUser] = useState('edgedb');
  const [password, setPassword] = useState('');
  const [host, setHost] = useState('127.0.0.1');
  const [port, setPort] = useState('5656');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await EdgeDBClient.connect({
        host,
        port,
        user,
        password,
      });
      setSuccess(true);
      setHasAuth(true);

      // Make transition smoother
      setTimeout(() => {
        navigate('/');
      }, 600);
    } catch (e) {
      console.error(e);
      console.error(e.response);
      if (e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      } else {
        setError(e.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      disabled={loading || success}
      className={classes.form}
      noValidate
      onSubmit={handleSubmit}
    >
      <MD.Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {error}
        </Alert>
      </MD.Snackbar>

      <MD.TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="user"
        label="User"
        name="user"
        autoComplete="user"
        autoFocus
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <MD.TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={classes.address}>
        <MD.TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="host"
          label="Host"
          name="host"
          autoComplete="host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <MD.TextField
          variant="outlined"
          margin="normal"
          required
          id="port"
          label="Port"
          name="port"
          autoComplete="port"
          inputProps={{
            maxLength: 5,
          }}
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
      </div>
      <MD.Button
        type="submit"
        fullWidth
        variant="contained"
        color={'primary'}
        disabled={loading || success}
        className={clsx(classes.submit, {
          [classes.successButton]: success,
        })}
      >
        {loading && !success && (
          <MD.CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {success ? 'Connected' : loading ? 'Connecting' : 'Connect'}
      </MD.Button>
    </Form>
  );
}

LoginForm.propTypes = {};
