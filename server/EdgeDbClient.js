const edgedb = require('edgedb');

class EdgeDbClient {
  constructor(connectOptions) {
    this.connectionOptions = connectOptions;
    this.connection = null;
  }

  async connect() {
    console.debug(
      `connecting to EdgeDB${
        this.connectionOptions.database
          ? ` using db ${this.connectionOptions.database}`
          : ''
      }`
    );

    // connect with timeout
    // see https://github.com/edgedb/edgedb-js/issues/41
    this.connection = await Promise.race([
      edgedb.connect(this.connectionOptions),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);

    if (!this.connection) {
      console.error('connection to EdgeDB timed out');
      throw new Error('timeout');
    }
  }
  async close() {
    if (this.connection) {
      console.debug('closing EdgeDB connection');
      await this.connection.close(this.connectionOptions);
    }
  }

  async getConnection() {
    if (!this.connection) {
      await this.connect();
    }
    return this.connection;
  }
}

module.exports = EdgeDbClient;
