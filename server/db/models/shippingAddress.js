const Sequelize = require('sequelize')
const db = require('../db')

const ShippingAddress = db.define('shippingAddress', {
  shippingStreetAddress: {
    type: Sequelize.STRING
  },
  shippingCity: {
    type: Sequelize.STRING
  },
  shippingState: {
    type: Sequelize.STRING
  },
  shippingZipCode: {
    type: Sequelize.INTEGER
  }
})

module.exports = ShippingAddress
