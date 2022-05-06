const Item = require('../model.js');
const mongoose = require('mongoose');

const saveItem = async (name, icon) => {

  const itemExists = await Item.exists({ name });

  if (itemExists) {
    return Item.find({}).then(result => { return result });
  } else {
    return Item.create({
      name,
      icon
    })
      .then(() => {
        return Item.find({}).then(result => { return result });
      })
  }
}

const removeItem = async (name) => {
  return Item.deleteMany({ name })
    .then(() => {
      return Item.find({}).then(result => { return result });
    })
}

const checkFavorite = async (name) => {
  try {
    const isFav = await Item.exists({ name })

    if (isFav) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
}

const getFavorites = async () => {
  try {
    const favorites = await Item.find({});
    return favorites;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  saveItem,
  removeItem,
  checkFavorite,
  getFavorites,
}