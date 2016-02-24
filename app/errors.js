'use strict'

const util = require('util')

module.exports = {
  OfferNotValid
}

function OfferNotValid(message) {
  Error.call(this, message)

  Error.captureStackTrace(this)
}

util.inherits(OfferNotValid, Error)