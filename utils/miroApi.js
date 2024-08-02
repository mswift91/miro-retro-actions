const axios = require('axios');
const { miro } = require('../config/config');

const api = axios.create({
  baseURL: 'https://api.miro.com/v2',
  headers: {
    'Authorization': `Bearer ${miro.token}`
  }
});
