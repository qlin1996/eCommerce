const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED'
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
