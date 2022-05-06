const OSRS = require('osrs-trade-stats');

const getId = (name) => {
  let itemName = convertSpaceToUnderscore(capFirstLetter(name));
  return OSRS.ITEMS_LIST[itemName];
}

const capFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const convertSpaceToUnderscore = (str) => {
  return str.replace(' ', '_');
}

const getTradeData = async (name) => {

  const id = getId(name);
  const itemData = await OSRS.getFromOfficialAPI(id);
  const tradeData = await OSRS.getTradeVolume(id);

  itemData.trade = tradeData;

  return itemData;
}

module.exports = {
  getTradeData
}