'use strict'

require('dotenv').config({path: '.env', silent: true})

const PORT = process.env.PORT || 3000
const app = require('./app/express-app')

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})