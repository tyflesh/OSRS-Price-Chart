const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const helmet = require('helmet');
const cors = require('cors');
const { getTradeData } = require('./OSRS.js');
const { saveItem, removeItem, checkFavorite, getFavorites } = require('../database/controllers/item.js');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.post('/item', (req, res) => {
  console.log(req.body.name);
  getTradeData(req.body.name)
    .then(result => {
      checkFavorite(result.name)
        .then(isFav => {
          result.favorite = isFav;
          res.status(201).send(result);
        })
    })
    .catch(err => {
      console.log('------------------------- error getting trade data -------------------------');
      console.error(err);
      res.status(409).send(err);
    })
});

app.post('/addFavorite', (req, res) => {
  saveItem(req.body.name, req.body.icon)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log('error adding to favorites');
      console.error(err);
      res.status(409).send(err);
    })
})

app.post('/removeFavorite', (req, res) => {
  removeItem(req.body.name)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log('error removing from favorites');
      console.error(err);
      res.status(409).send(err);
    })
})

app.get('/getFavorites', (req, res) => {
  getFavorites()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(409).send(err);
    })

})

app.listen(process.env.SERVERPORT, () => {
  console.log('listening on port ' + process.env.SERVERPORT);
});