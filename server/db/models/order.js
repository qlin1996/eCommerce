const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isSubmitted: {
    type: Sequelize.ENUM('yes', 'no'),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 'no'
  },
  totalOrderPrice: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      min: 1
    },
    get() {
      return this.getDataValue('price') / 100
    }
  },
  dateSubmitted: {
    type: Sequelize.DATE
  }
})

module.exports = Order
