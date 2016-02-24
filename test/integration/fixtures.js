'use strict'

const moment = require('moment')
const chance = require('chance').Chance()
const SqlFixtures = require('sql-fixtures')

const dataClient = require('knex')({
  client: 'mysql2',
  connection: process.env.MYSQL_CONNECTION,
  pool: {
    min: 2,
    max: 2
  }
})
const loader = new SqlFixtures(dataClient)

module.exports = {
  dataClient,
  load: () => {
    return clean().then(() => load())
  }
}

function clean() {
  return dataClient
    .from('offer')
    .del()
}

function load() {
  return loader
    .create(data)
    .then(r => ({
      valid: [r.offer[0], r.offer[1]],
      invalid: [r.offer[2], r.offer[3]]
    }))
}

const data = {
  hotel: [
    {
      name: chance.sentence({words: 2})
    },
    {
      name: chance.sentence({words: 2})
    }
  ],
  offer: [
    //valid
    {
      hotel_id: 'hotel:0',
      checkin: moment().add(2, 'days').toDate(),
      checkout: moment().add(3, 'days').toDate(),
      price: chance.floating({min: 0, max: 300}),
      status: 'valid'
    },
    {
      hotel_id: 'hotel:1',
      checkin: moment().toDate(),
      checkout: moment().add(2, 'days').toDate(),
      price: chance.floating({min: 0, max: 300}),
      status: 'valid'
    },
    //invalid
    {
      hotel_id: 'hotel:0',
      checkin: moment().add(-3, 'days').toDate(),
      checkout: moment().add(-2, 'days').toDate(),
      price: chance.floating({min: 0, max: 300}),
      status: 'booked'
    },
    {
      hotel_id: 'hotel:1',
      checkin: moment().add(3, 'days').toDate(),
      checkout: moment().add(4, 'days').toDate(),
      price: chance.floating({min: 0, max: 300}),
      status: 'booked'
    }
  ]
}