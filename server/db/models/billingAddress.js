const Sequelize = require('sequelize')
const db = require('../db')

const BillingAddress = db.define('billingAddress', {
  billingStreetAddress: {
    type: Sequelize.STRING
  },
  billingCity: {
    type: Sequelize.STRING
  },
  billingState: {
    type: Sequelize.STRING
  },
  billingZipCode: {
    type: Sequelize.INTEGER
  }
})

module.exports = BillingAddress
