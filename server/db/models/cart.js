const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'completed'),
    defaultValue: 'created'
  },
  cartSubTotal: {
    type: Sequelize.FLOAT
  },
  cartShipping: {
    type: Sequelize.FLOAT
  },
  cartTax: {
    type: Sequelize.FLOAT
  },
  cartTotal: {
    type: Sequelize.FLOAT
  },
  dateSubmitted: {
    type: Sequelize.DATE
  },
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

module.exports = Cart
