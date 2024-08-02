const axios = require('axios');
const { miro } = require('../config/config');

const api = axios.create({
  baseURL: 'https://api.miro.com/v2',
  headers: {
    'Authorization': `Bearer ${miro.token}`
  }
});

async function fetchAllItems(boardId) {
    let items = [];
    let nextUrl = `/boards/${boardId}/items`;
    
    while (nextUrl) {
      try {
        const response = await api.get(nextUrl);
        items = items.concat(response.data.data);
        nextUrl = response.data.links.next ? response.data.links.next.replace('https://api.miro.com/v2', '') : null;
      } catch (error) {
        console.error('Error fetching data from Miro API:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
    
    return items;
  }
  
  module.exports = {
    fetchAllItems,
  };