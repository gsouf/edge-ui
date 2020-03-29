import axios from 'axios';

class EdgeDBClient {
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

  async edgeql(query) {
    try {
      const res = await axios.post('/api/edgeql', {
        query: query,
      });
      return res.data;
    } catch (e) {
      console.error(e);
      const message = e.response?.data?.error || e.message;
      throw Error(message);
    }
  }

  async logout() {
    try {
      const res = await axios.post('/api/logout');
      return res.data;
    } catch (e) {
      console.error(e);
      const message = e.response?.data?.error || e.message;
      throw Error(message);
    }
  }
}

const client = new EdgeDBClient();
export default client;
