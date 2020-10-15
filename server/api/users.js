const router = require('express').Router()
const {User, Cart, Product, CartItem} = require('../db/models')
module.exports = router

// gate keepers
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin === 'yes') {
    return next()
  } else {
    const err = new Error("You don't have admin access.")
    err.status = 401
    return next(err)
  }
}

const isSelfOrAdmin = (req, res, next) => {
  if (Number(req.params.userId) === req.user.id || req.user.isAdmin === 'yes') {
    return next()
  } else {
    const err = new Error("Please don't hack us.")
    err.status = 401
    return next(err)
  }
}

// GET api/users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// PATCH api/users/:userId/
router.patch('/:userId/', isSelfOrAdmin, async (req, res, next) => {
  try {
    const updatedUserInfo = await User.update(req.body, {
      where: {id: req.params.userId},
      returning: true
    })
    const [numUpdated, [updatedPug]] = updatedUserInfo
    res.json(updatedPug)
  } catch (error) {
    next(error)
  }
})

// GET api/users/:userId/cart
router.get('/:userId/cart', async (req, res, next) => {
  try {
    let cart = await Cart.findOrCreate({
      where: {userId: req.params.userId, status: 'created'},
      include: [{model: Product}],
      order: [[{model: Product}, 'name', 'ASC']]
    })
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})

// POST api/users/:userId/cart
router.post('/:userId/cart', isSelfOrAdmin, async (req, res, next) => {
  try {
    const cart = await Cart.create({
      userId: req.params.userId,
      status: 'created'
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// PATCH api/users/:userId/cart
router.patch('/:userId/cart', async (req, res, next) => {
  try {
    const updatedCartInfo = await Cart.update(req.body, {
      where: {userId: req.params.userId},
      returning: true
    })
    const [numUpdated, [updatedCart]] = updatedCartInfo
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})

// POST api/users/:userId/cartItem
router.post('/:userId/cartItem', isSelfOrAdmin, async (req, res, next) => {
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

// DELETE api/users/:userId/cartItem
router.delete('/:userId/cartItem', isSelfOrAdmin, async (req, res, next) => {
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

// PATCH api/users/:userId/cartItem
router.patch('/:userId/cartItem', async (req, res, next) => {
  try {
    await CartItem.update(req.body, {
      where: {
        cartId: req.body.cartId,
        productId: req.body.productId
      },
      returning: true
    })
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
