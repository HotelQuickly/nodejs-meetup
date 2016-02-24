'use strict'

const knex = require('knex')

const client = knex({
  client: 'mysql2',
  connection: process.env.MYSQL_CONNECTION
})

module.exports = {
  findOffer,
  findOffers,
  bookAndOrder
}

function findOffers() {
  return client
    .from('offer')
    .innerJoin('hotel', 'offer.hotel_id', 'hotel.id')
    .where({
      'offer.status': 'valid'
    })
    .andWhereRaw('checkin >= DATE(NOW())')
    .select(
      'offer.id', 'offer.price', 'offer.status',
      'hotel.id as hotel_id', 'hotel.name as hotel_name')
}

function findOffer(offerId) {
  return client
    .from('offer')
    .where({
      id: offerId
    })
    .select()
    .then(offers => offers[0])
}

function bookAndOrder(offerId) {
  return client.transaction(trx => bookOffer(trx, offerId).then(() => createOrder(trx, offerId)))
}

function bookOffer(trx, offerId) {
  return trx('offer')
    .where({
      id: offerId
    })
    .update({
      status: 'booked'
    })
}

function createOrder(trx, offerId) {
  return trx
    .insert({offer_id: offerId})
    .into('order')
}
