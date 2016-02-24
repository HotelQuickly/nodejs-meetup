'use strict'

const sinon = require('sinon')
const should = require('should')
require('should-sinon')
const chance = require('chance').Chance()
const proxyquire = require('proxyquire').noCallThru()

const errors = require('../../app/errors')

describe('business', () => {

  const dataStub = {
    findOffer: sinon.stub()
  }

  const business = proxyquire('../../app/business', {
    './data': dataStub
  })

  const validOfferId = chance.integer()
  const invalidOfferId = chance.integer()

  const validOffer = {status: 'valid'}
  const invalidOffer = {status: 'booked'}

  dataStub.findOffer.withArgs(validOfferId).returns(Promise.resolve(validOffer))
  dataStub.findOffer.withArgs(invalidOfferId).returns(Promise.resolve(invalidOffer))

  describe('method bookOffer', () => {

    beforeEach(() => {
      dataStub.bookAndOrder = sinon.stub()
    })

    it('should not throw and call data layer if offer is active', () => {
      return business
        .bookOffer(validOfferId)
        .then(() => {
          dataStub.bookAndOrder.should.be.calledWith(validOfferId)
        })
    })

    it('should throw an error if offer is not active', () => {
      return business
        .bookOffer(invalidOfferId)
        .should.be.rejectedWith(errors.OfferNotValid)
    })
  })
})