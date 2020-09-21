const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

User.hasMany(Order)
Product.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Product, {through: OrderItem})

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
