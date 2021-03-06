import config from './config';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${config.baseURL}`
});

const get = (endpoints) => {
  return instance.get(`${endpoints}`)
    .then((response) => {
      switch (response.status) {
        case 403:
          return {error: {message: 'Invalid token'}, kickOut: true};
        case 404:
          return {error: {message: 'Cannot connect to server'}};
        default:
          return response;
      }
    })
    .catch((err) => {
      // Check if it's json method response
      throw err;
    });
};


export const getPerson = (personName) => {
  return get(`${config.endpoints.USER}/${personName}`);
};


