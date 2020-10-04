const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    defaultValue: 'created'
  },
  totalCartPrice: {
    type: Sequelize.FLOAT,
    validate: {
      isNumeric: true,
      min: 1
    }
  },
  dateSubmitted: {
    type: Sequelize.DATE
  }
})

module.exports = Cart
