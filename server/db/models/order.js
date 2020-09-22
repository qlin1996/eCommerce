const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED'
  },
  totalOrderPrice: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      min: 1
    }
  },
  dateSubmitted: {
    type: Sequelize.DATE
  }
})

module.exports = Order
