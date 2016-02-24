'use strict'

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
  res.end()
})