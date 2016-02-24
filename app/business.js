'use strict'

const data = require('./data')
const errors = require('./errors')

module.exports = {
  bookOffer,
  findOffers
}

function findOffers() {
  return data
    .findOffers()
}

function findValidOffer(offerId) {
  return data
    .findOffer(offerId)
    .then(offer => {
      if (offer && offer.status === 'valid') {
        return offer
      }

      throw new errors.OfferNotValid('not active status')
    })
}

function bookOffer(offerId) {
  return findValidOffer(offerId).then(() => data.bookAndOrder(offerId))
}
