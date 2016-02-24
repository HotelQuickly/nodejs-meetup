'use strict'

const knex = require('knex')

const client = knex({
  client: 'mysql2',
  connection: process.env.MYSQL_CONNECTION
})

module.exports = {
  findOffers
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
