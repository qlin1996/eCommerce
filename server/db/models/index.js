const User = require('./user')
const BillingAddress = require('./billingAddress')
const ShippingAddress = require('./shippingAddress')
const Product = require('./product')
const Cart = require('./cart')
const CartItem = require('./cartItem')

User.hasMany(Cart)
BillingAddress.hasOne(User)
ShippingAddress.hasOne(Cart)

Product.belongsToMany(Cart, {through: CartItem})
Cart.belongsToMany(Product, {through: CartItem})

module.exports = {
  User,
  Product,
  Cart,
  CartItem,
  BillingAddress,
  ShippingAddress
}
