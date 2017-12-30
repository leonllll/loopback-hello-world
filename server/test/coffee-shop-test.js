
'use strict';
var app = require('../server');

var CoffeeShop = app.models.CoffeeShop;
var instanceData = {
  'name': 'hi coffee',
  'city': 'Shijiazhuang'
};
CoffeeShop.create(instanceData)
  .then(result => console.log(result))
  .catch(err => console.error(err));