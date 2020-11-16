import queryString from 'query-string';
import getUserId from './UserId';
import Log from './Log';
import { apiServer } from '../../settings';

class ApiClient {
  constructor() {
    this.userId = getUserId();
    this.apiServer = apiServer;
  }

  url(path) {
    return `${this.apiServer}${path}`;
  }

  get(path, params) {
    const url = `${this.url(path)}?${queryString.stringify(params)}`;
    const myHeaders = new Headers();

    Log.info(`Attempting to GET ${url}`);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        Log.info('Response: ', res);
      })
      .catch(err => {
        Log.error('Error message: ', err);
      });
  }

  post(path, params) {
    const url = this.url(path);

    Log.info(`Attempting to POST ${JSON.stringify(params)} to ${url}`);

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(res => {
        Log.info('Response: ', res);
      })
      .catch(err => {
        Log.error('Error message: ', err);
      });
  }

  recordSongReaction(song, reaction) {
    this.post('/song-reaction', {
      Timestamp: Date.now(),
      Song: song,
      Reaction: reaction,
      ListenerId: this.userId,
    });
  }
}

export default new ApiClient();
