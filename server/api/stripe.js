const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {v4} = require('uuid')
const router = require('express').Router()
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {token, cartTotal} = req.body
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const idempotencyKey = v4()
    await stripe.charges.create(
      {
        amount: cartTotal * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the x`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    )
    res.sendStatus(204)
  } catch (error) {
    res.send(error)
  }
})
