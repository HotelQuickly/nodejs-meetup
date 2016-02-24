'use strict'

const data = require('./data')

module.exports = {
  findOffers
}

function findOffers() {
  return data
    .findOffers()
}
