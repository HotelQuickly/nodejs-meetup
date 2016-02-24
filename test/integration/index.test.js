'use strict'

require('dotenv').config({path: '.env'})

const should = require('should')
const supertest = require('supertest')
const fixtures = require('./fixtures')
const expressApp = require('../../app/express-app')

const wrapper = supertest(expressApp)
const dataClient = fixtures.dataClient

describe('integration', () => {

  let offers

  beforeEach(() => {
    return fixtures.load().then(r => offers = r)
  })

  describe('GET offers', () => {

    it('should return only valid offers with checkin date greater than today', () => {

      return new Promise((resolve, reject) => {
        wrapper
          .get('/offers')
          .expect(200)
          .end(function (err, response) {
            if (err) {
              return reject(err)
            }

            resolve(response)
          })
      }).then(response => {
        const actualOffers = response.body
        should(actualOffers).have.length(offers.valid.length)

        offers.valid.forEach(offer => {
          should(actualOffers).containDeep([{id: offer.id}])
        })

      })
    })
  })

  describe('POST book', () => {

    it('should deny to book already booked offer', done => {
      wrapper
        .post('/book')
        .send({offerId: offers.invalid[0].id})
        .expect(400, done)
    })

    it('should create order for valid booked offer', done => {
      const offerId = offers.valid[0].id
      wrapper
        .post('/book')
        .send({offerId})
        .expect(200, (err) => {
          if (err) {
            return done(err)
          }

          dataClient
            .select()
            .from('order')
            .where({
              'offer_id': offerId
            })
            .then(orders => {
              try {
                orders.should.have.length(1)
              } catch (e) {
                return done(e)
              }

              done()
            })
        })
    })
  })
})