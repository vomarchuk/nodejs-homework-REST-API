const mongoose = require('mongoose')

const app = require('../app')
require('dotenv').config()

const { DB_HOST } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(8080)
    console.log('Database connection successful')
  })
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })
