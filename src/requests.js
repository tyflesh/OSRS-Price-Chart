const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    ContentType: 'application/json'
  }
});

const searchItem = (text) => instance.post('item', text);
const addFavorite = (itemName) => instance.post('addFavorite', itemName);
const removeFavorite = (itemName) => instance.post('removeFavorite', itemName);
const getFavorites = () => instance.get('getFavorites');

module.exports = {
  searchItem,
  addFavorite,
  removeFavorite,
  getFavorites,
};