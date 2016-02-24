'use strict'

require('dotenv').config({path: '.env'})

const should = require('should')
const supertest = require('supertest')
const fixtures = require('./fixtures')
const expressApp = require('../../app/express-app')

const wrapper = supertest(expressApp)

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
})