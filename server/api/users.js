const router = require('express').Router()
const {
  User,
  Order,
  Product,
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
