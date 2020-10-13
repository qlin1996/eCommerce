const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({order: [['createdAt', 'ASC']]})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// POST /api/products/
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//PATCH /api/products/:productId
router.patch('/:productId', async (req, res, next) => {
  try {
    const updatedProductInfo = await Product.update(req.body, {
      returning: true,
      where: {
        id: req.params.productId
      }
    })
    const [numUpdated, [updatedProduct]] = updatedProductInfo
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
