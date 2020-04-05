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
    this.connection = await edgedb.connect(this.connectionOptions);
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
