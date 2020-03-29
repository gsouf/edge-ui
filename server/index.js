const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const EdgeClient = require('./EdgeClient');

const app = express();

// sessions
app.use(
  expressSession({
    secret: 'CJo~rf}g|T*#lJQ',
    resave: false,
    saveUninitialized: false,
  })
);

// parse json
app.use(bodyParser.json());

// prepare connection
app.use((req, res, next) => {
  if (req.session.connectionOptions) {
    console.debug('reusing existing connection');
    req.edgeClient = new EdgeClient(req.session.connectionOptions);
  }
  res.once('finish', function () {
    if (req.edgeClient) {
      req.edgeClient.close();
    }
  });
  next();
});

/**
 * Log user in and persists connection
 */
app.post('/api/login', async (req, res) => {
  // TODO input validation
  const connectionOptions = {
    port: req.body.port,
    host: req.body.host,
    user: req.body.user,
    password: req.body.password,
  };
  const client = new EdgeClient(connectionOptions);

  try {
    // connect and send a test query
    console.debug('connecting to EdgeDB');
    await client.connect();
    const r = await (await client.getConnection()).fetchOne('SELECT 1 + 1');
    if (r !== 2) {
      throw `Cannot fetch data from EdgeDB (${r})`;
    }
  } catch (e) {
    console.error(e);
    res.status(403);
    res.json({ status: 'error', error: e.message });
    return;
  } finally {
    client.close().catch((e) => {
      console.error(e);
    });
  }

  req.session.connectionOptions = connectionOptions;
  res.json({ status: 'ok' });
});

/**
 * Check if connection exists
 */
app.get('/api/has-connection', async (req, res) => {
  res.status(200);
  if (req.edgeClient) {
    try {
      const conn = await req.edgeClient.getConnection();
      const r = await conn.fetchOne('SELECT 1 + 1');
      if (r === 2) {
        res.json({ hasConnection: true });
      } else {
        throw `Cannot fetch data from EdgeDB (${r})`;
      }
    } catch (e) {
      res.json({ hasConnection: false, error: e.message });
    }
  } else {
    res.json({ hasConnection: false });
  }
});

app.post('/api/edgeql', async (req, res) => {
  if (!req.edgeClient) {
    res.status(401);
    res.json({ status: 'error', error: 'Not connected' });
  } else {
    // TODO validate input
    try {
      const conn = await req.edgeClient.getConnection();
      console.debug(`executing: ${req.body.query}`);
      const r = await conn.fetchAll(req.body.query);
      res.status(200);
      res.json({ status: 'ok', data: r });
    } catch (e) {
      console.error(e);
      res.status(500);
      res.json({ status: 'error', error: e.message });
    }
  }
});

app.post('/api/logout', (req, res) => {
  req.session.connectionOptions = null;
  res.status(200);
  res.json({ status: 'ok' });
});

const port = 5005;
app.listen(port, () =>
  console.log(`Express server is running on http://localhost:${port}`)
);
