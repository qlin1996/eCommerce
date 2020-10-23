import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import history from '../history'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchCartThunk, updateCartThunk, createCartThunk} from '../store/cart'

class Stripe extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.fetchCartThunk(this.props.user.id)
  }

  handleToken = async token => {
    this.props.handleSubmit()
    try {
      await axios.post('/api/stripe', {
        token,
        cartTotal: this.props.cart.cartTotal
      })
      await this.props.updateCartThunk(this.props.user.id, {
        shippingStreetAddress: token.card.address_line1,
        shippingCity: token.card.address_city,
        shippingState: token.card.address_state,
        shippingZipCode: token.card.address_zip,
        status: 'processing',
        dateSubmitted: new Date()
      })
      await this.props.createCartThunk(this.props.user.id)
      history.push('/confirmation')
    } catch (error) {
      console.log('ERROR WITH PAYMENT>>>', error)
    }
  }

  render() {
    return (
      <div className="container">
        <StripeCheckout
          stripeKey="pk_test_51HfCAyA0VeJ65fweLn9RJCNGFgg9atbiUzsexKEKry33XCbze03Fe3XohkziRj8ABLkMHpCOOG8oIF4ltl6zr8Tb008kHQi9gG"
          token={this.handleToken}
          amount={this.props.cartTotal * 100}
          name="Checkout"
          billingAddress
          shippingAddress
        />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  me: () => dispatch(me()),
  fetchCartThunk: userId => dispatch(fetchCartThunk(userId)),
  updateCartThunk: (userId, cartInfo) =>
    dispatch(updateCartThunk(userId, cartInfo)),
  createCartThunk: userId => dispatch(createCartThunk(userId))
})

export default connect(mapState, mapDispatch)(Stripe)
