const router = require('express').Router()
const {
  User,
  Cart,
  Product,
  CartItem,
  BillingAddress,
  StreetAddress
} = require('../db/models')
module.exports = router

// GET api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET api/users/:userId/cart
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'created'},
      include: [{model: Product}],
      order: [[{model: Product}, 'name', 'ASC']]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// POST api/users/:userId/cart
router.post('/:userId/cart', async (req, res, next) => {
  try {
    await CartItem.create({
      cartId: req.body.cartId,
      productId: req.body.productId,
      cartItemQuantity: 1,
      cartItemPrice: req.body.cartItemPrice
    })
    const cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'created'},
      include: [{model: Product}],
      order: [[{model: Product}, 'name', 'ASC']]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
