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

// gate keepers
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) return next()
  res.redirect('/')
}

const isSelf = (req, res, next) => {
  if (Number(req.params.userId) === req.user.id) {
    return next()
  } else {
    const err = new Error("Please don't hack")
    err.status = 401
    return next(err)
  }
  // res.redirect('/')
}

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
router.get('/:userId/cart', isSelf, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'created'},
      include: [{model: Product}],
      order: [[{model: Product}, 'name', 'ASC']]
    })
    if (!cart) {
      await Cart.create({userId: req.params.userId})
    }
    cart = await Cart.findOne({
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

// DELETE api/users/:userId/cart
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: {cartId: req.body.cartId, productId: req.body.productId}
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

// PATCH api/users/:userId/cart
router.patch('/:userId/cart', async (req, res, next) => {
  try {
    await CartItem.update(
      {cartItemQuantity: req.body.cartItemQuantity},
      {
        where: {
          cartId: req.body.cartId,
          productId: req.body.productId
        }
      }
    )
    const cart = await Cart.findOne({
      where: {userId: req.params.userId, status: 'created'},
      include: [{model: Product}],
      order: [[{model: Product}, 'name', 'ASC']]
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
