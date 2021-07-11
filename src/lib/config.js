import Axios from 'axios';
import axiosRetry from 'axios-retry';

export const axios = Axios.create({
  baseURL: 'https://api.airtable.com/v0/app9MGblo5PLiOEaf/',
  timeout: 10e3,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer keyiRYZ9Op9nvXwPj',
  },
});

axiosRetry(axios, {
  retries: 4,
  retryCondition: (error) => {
    if (
      error &&
      error.message === 'Network Error' &&
      error.config &&
      error.config.url.includes('lookup')
    ) {
      return false;
    }
    return true;
  },
  retryDelay: () => 1000,
});
