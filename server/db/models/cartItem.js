const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  cartItemQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cartItemPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 100,
    validate: {
      isNumeric: true,
      min: 1
    }
  }
})

module.exports = CartItem
