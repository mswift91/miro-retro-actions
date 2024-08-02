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
  
  function findMostRecentActionsBox(items) {
    const actionsBoxes = items.filter(item => item.type === 'shape' && item.data && item.data.content && item.data.content.includes('Actions'));
    actionsBoxes.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
    return actionsBoxes[0];
  }
  
  function getPostItsInBox(items, box) {
    return items.filter(item => item.type === 'sticky_note' && item.position && isInside(box, item));
  }
  
  function isInside(box, item) {
    return (
      item.position.x > (box.position.x - box.geometry.width / 2) &&
      item.position.x < (box.position.x + box.geometry.width / 2) &&
      item.position.y > (box.position.y - box.geometry.height / 2) &&
      item.position.y < (box.position.y + box.geometry.height / 2)
    );
  }

function stripPTags(content) {
    return content.replace(/<\/?p>/g, '');
  }
  
  module.exports = {
    fetchAllItems,
    findMostRecentActionsBox,
    getPostItsInBox,
    stripPTags,
  };
  