const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  orderItemQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderItemPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 100,
    validate: {
      isNumeric: true,
      min: 1
    }
  }
})

module.exports = OrderItem
