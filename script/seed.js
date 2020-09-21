/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')
const faker = require('faker')

const orders = [
  {
    userId: 1,
    totalOrderPrice: 7899,
    dateSubmitted: new Date()
  },
  {
    userId: 2,
    totalOrderPrice: 11216,
    dateSubmitted: new Date()
  }
]

const orderitems = [
  {
    orderItemQuantity: 1,
    orderItemPrice: 7899,
    productId: 1,
    orderId: 1
  },
  {
    orderItemQuantity: 2,
    orderItemPrice: 5608,
    productId: 12,
    orderId: 2
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // users
  const users = []
  const admin = await User.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin',
    isAdmin: 'yes',
    billingStreetAddress: '3847 Prince Street',
    billingCity: 'New York',
    billingState: 'New York',
    billingZipCode: 11327,
    shippingStreetAddress: '3847 Prince Street',
    shippingCity: 'New York',
    shippingState: 'New York',
    shippingZipCode: 11327
  })
  users.push(admin)
  const user = await User.create({
    firstName: 'User',
    lastName: 'User',
    email: 'user@gmail.com',
    password: 'user',
    isAdmin: 'no',
    billingStreetAddress: '3847 Prince Street',
    billingCity: 'New York',
    billingState: 'New York',
    billingZipCode: 11327,
    shippingStreetAddress: '3847 Prince Street',
    shippingCity: 'New York',
    shippingState: 'New York',
    shippingZipCode: 11327
  })
  users.push(user)

  // products
  const products = []
  const necklace1 = await Product.create({
    name: 'Two Butterfly pendant',
    description:
      'Two Butterfly pendant, rose gold, white mother-of-pearl, round diamond, white gold, marquise diamond, diamond quality DEF, IF to VVS.',
    price: 7899,
    imageUrl:
      'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/73/6/1627736.png.adapt.1070.1070.png',
    quantityInStock: 10,
    category: 'Necklace'
  })
  products.push(necklace1)
  for (let i = 0; i < 10; i++) {
    const necklace = await Product.create({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/11/5/1627115.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Necklace'
    })
    products.push(necklace.dataValues)
  }
  const bracelet1 = await Product.create({
    name: 'Perlée signature bracelet',
    description: 'Perlée signature bracelet, yellow gold, medium model',
    price: 5608,
    imageUrl:
      'https://www.vancleefarpels.com/content/dam/rcq/vca/18/38/98/0/1838980.png.adapt.1070.1070.png',
    quantityInStock: 10,
    category: 'Necklace'
  })
  products.push(bracelet1)
  for (let i = 0; i < 10; i++) {
    const bracelet = await Product.create({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/17/59/45/0/1759450.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Bracelet'
    })
    products.push(bracelet.dataValues)
  }
  const ring1 = await Product.create({
    name: 'Félicité wedding band',
    description:
      'Félicité wedding band, yellow gold, round diamonds; diamond quality DEF, IF to VVS.',
    price: 9974,
    imageUrl:
      'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/76/1/1627761.png.adapt.1070.1070.png',
    quantityInStock: 10,
    category: 'Ring'
  })
  products.push(ring1)
  for (let i = 0; i < 10; i++) {
    const ring = await Product.create({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/16/26/91/4/1626914.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Ring'
    })
    products.push(ring.dataValues)
  }
  const earring1 = await Product.create({
    name: 'Rose de Noël earrings',
    description:
      'Rose de Noël earrings, small model, yellow gold, white mother-of-pearl, round diamonds; diamond quality DEF, IF to VVS.',
    price: 2374,
    imageUrl:
      'https://www.vancleefarpels.com/content/dam/rcq/vca/16/26/57/1/1626571.png.adapt.1070.1070.png',
    quantityInStock: 10,
    category: 'Earring'
  })
  products.push(earring1)
  for (let i = 0; i < 10; i++) {
    const earring = await Product.create({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/98/5/1627985.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Earring'
    })
    products.push(earring.dataValues)
  }

  // order
  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  // orderItems
  await Promise.all(
    orderitems.map(item => {
      return OrderItem.create(item)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
