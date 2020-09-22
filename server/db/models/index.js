const User = require('./user')
const BillingAddress = require('./billingAddress')
const ShippingAddress = require('./shippingAddress')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

User.hasMany(Order)
BillingAddress.hasOne(User)
ShippingAddress.hasOne(User)
Product.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Product, {through: OrderItem})

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  BillingAddress,
  ShippingAddress
}
