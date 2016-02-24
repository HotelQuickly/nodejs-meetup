'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = module.exports = express()

app.use(bodyParser.json())

app.get('/offers', (req, res) => {
  res.end()
})

app.post('/book', (req, res) => {
  res.end()
})