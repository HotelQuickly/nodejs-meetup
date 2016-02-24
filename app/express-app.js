'use strict'

const errors = require('./errors')
const express = require('express')
const business = require('./business')
const bodyParser = require('body-parser')

const app = module.exports = express()

app.use(bodyParser.json())

app.get('/offers', (req, res) => {
  business
    .findOffers()
    .then(offers => {
      res.send(offers)
    })
})

app.post('/book', (req, res) => {
  business
    .bookOffer(req.body.offerId)
    .then(() => {
      res.end()
    })
    .catch(err => {
      if (err instanceof errors.OfferNotValid) {
        return res.status(400).end()
      }
      throw err
    })
})
