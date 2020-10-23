import React, {useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

function Stripe() {
  const [product] = useState({
    name: 'Tesla Roadster',
    price: 6.67,
    description: 'Cool car'
  })
  async function handleToken(token) {
    const response = await axios.post('/api/stripe', {token, product})
    const status = response.data
    if (status === 'success') {
      console.log('Success! Check email for details', {type: 'success'})
    } else {
      console.log('Something went wrong', {type: 'error'})
    }
  }
  return (
    <div className="container">
      <StripeCheckout
        stripeKey="pk_test_51HfCAyA0VeJ65fweLn9RJCNGFgg9atbiUzsexKEKry33XCbze03Fe3XohkziRj8ABLkMHpCOOG8oIF4ltl6zr8Tb008kHQi9gG"
        token={handleToken}
        amount={product.price * 100}
        name="Random Text"
        billingAddress
        shippingAddress
      />
    </div>
  )
}
export default Stripe
