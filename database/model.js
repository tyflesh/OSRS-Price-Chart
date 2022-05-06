const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  icon: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;