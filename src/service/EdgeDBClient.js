import axios from 'axios';

export default class EdgeDBClient {
  constructor() {
    this.conn = null;
  }

  async connect({ port, host, user, password }) {
    await axios.post('/api/login', {
      port,
      host,
      user,
      password,
    });

    return true;
  }

  async hasConnection() {
    try {
      let res = await axios.get('/api/has-connection');
      if (res.data.error) {
        console.error(res.data.error);
      }
      return !!res.data.hasConnection;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
