/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  OrderItem,
  BillingAddress,
  ShippingAddress
} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // billing and shipping Addresses
  await Promise.all([
    BillingAddress.create({
      billingStreetAddress: '3847 Prince Street',
      billingCity: 'New York',
      billingState: 'New York',
      billingZipCode: 11327
    }),
    ShippingAddress.create({
      shippingStreetAddress: '3847 Prince Street',
      shippingCity: 'New York',
      shippingState: 'New York',
      shippingZipCode: 11327
    })
  ])

  // users
  const users = []
  const admin = await User.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin',
    isAdmin: 'yes'
  })
  users.push(admin)
  const user = await User.create({
    firstName: 'User',
    lastName: 'User',
    email: 'user@gmail.com',
    password: 'user',
    isAdmin: 'no',
    billingAddressId: 1
  })
  users.push(user)

  // products
  const products = []
  const necklace1 = await Product.create({
    name: 'Trace Chain',
    description: 'Angle filed trace chain, white gold, 40 wire, 42 cm.',
    price: 78.99,
    imageUrl:
      'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/10/8/1627108.png.adapt.1070.1070.png',
    quantityInStock: 10,
    category: 'Necklace'
  })
  products.push(necklace1)
  for (let i = 0; i < 10; i++) {
    const necklace = await Product.create({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: faker.finance.amount(50, 200, 2),
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/11/5/1627115.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Necklace'
    })
    products.push(necklace.dataValues)
  }
  const bracelet1 = await Product.create({
    name: 'Perlée bracelet',
    description: 'Perlée bracelet, yellow gold, medium model',
    price: 56.08,
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
      price: faker.finance.amount(50, 200, 2),
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/17/59/45/0/1759450.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Bracelet'
    })
    products.push(bracelet.dataValues)
  }
  const ring1 = await Product.create({
    name: 'Félicité ring',
    description:
      'Félicité ring, yellow gold, round diamonds; diamond quality DEF, IF to VVS.',
    price: 99.74,
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
      price: faker.finance.amount(50, 200, 2),
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/16/26/91/4/1626914.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Ring'
    })
    products.push(ring.dataValues)
  }
  const earring1 = await Product.create({
    name: 'Rose earrings',
    description:
      'Rose earrings, small model, yellow gold, white mother-of-pearl, round diamonds; diamond quality DEF, IF to VVS.',
    price: 23.74,
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
      price: faker.finance.amount(50, 200, 2),
      imageUrl:
        'https://www.vancleefarpels.com/content/dam/rcq/vca/16/27/98/5/1627985.png.adapt.1070.1070.png',
      quantityInStock: 10,
      category: 'Earring'
    })
    products.push(earring.dataValues)
  }

  // order
  await Promise.all([
    Order.create({
      userId: 2,
      totalOrderPrice: 112.16,
      dateSubmitted: new Date(),
      shippingAddressId: 1
    })
  ])

  // orderItems
  await Promise.all([
    OrderItem.create({
      orderItemQuantity: 2,
      orderItemPrice: 56.08,
      productId: 12,
      orderId: 1
    })
  ])

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
