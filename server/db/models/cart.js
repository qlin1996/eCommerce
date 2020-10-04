const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
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
  }
})

module.exports = Cart
