import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCartThunk,
  updateCartThunk,
  updateCartItemThunk,
  deleteCartItemThunk
} from '../store/cart'
import {me} from '../store/user'
import CartItem from './cart-item'
import Stripe from './stripe'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cartSubTotal: 0,
      cartShipping: 5,
      cartTax: 0,
      cartTotal: 0
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.minus = this.minus.bind(this)
    this.plus = this.plus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.me()
    await this.props.fetchCartThunk(this.props.user.id)
    this.calculate()
  }

  calculate = () => {
    const taxRate = 0.08875
    const products = this.props.cart.products || []
    const cartSubTotal = products
      .map(product => product.price * product.cartItem.cartItemQuantity)
      .reduce((accum, currentVal) => accum + currentVal, 0)
    const cartTax = cartSubTotal * taxRate
    const cartTotal = cartSubTotal * (1 + taxRate) + this.state.cartShipping

    this.setState({
      cartSubTotal: cartSubTotal.toFixed(2),
      cartTax: cartTax.toFixed(2),
      cartTotal: cartTotal.toFixed(2)
    })
  }

  async handleDelete(event, productId) {
    event.preventDefault()
    await this.props.deleteCartItemThunk(
      this.props.user.id,
      this.props.cart.id,
      productId
    )
    this.calculate()
  }

  async minus(productId, cartItemQuantity, cartItemPrice) {
    if (cartItemQuantity === 0) {
      await this.props.deleteCartItemThunk(
        this.props.user.id,
        this.props.cart.id,
        productId
      )
      this.calculate()
    } else {
      await this.props.updateCartItemThunk(this.props.user.id, {
        cartId: this.props.cart.id,
        productId,
        cartItemQuantity,
        cartItemPrice
      })
      this.calculate()
    }
  }

  async plus(productId, cartItemQuantity, cartItemPrice) {
    await this.props.updateCartItemThunk(this.props.user.id, {
      cartId: this.props.cart.id,
      productId,
      cartItemQuantity,
      cartItemPrice
    })
    this.calculate()
  }

  async handleSubmit() {
    await this.props.updateCartThunk(this.props.user.id, this.state)
  }

  render() {
    const products = this.props.cart.products || []

    return (
      <div className="wrap">
        <div className="heading">
          <h2>My Cart</h2>
          <div>
            <Link to="/products" className="continue">
              Continue Shopping
            </Link>
          </div>
        </div>
        {products.map(product => (
          <div key={product.id} className="item">
            <CartItem
              product={product}
              minus={this.minus}
              plus={this.plus}
              handleDelete={this.handleDelete}
            />
          </div>
        ))}
        <div className="totals">
          <ul>
            <li className="total-row">
              <span className="label">subtotal</span>
              <span className="value">${this.state.cartSubTotal}</span>
            </li>
            <li className="total-row">
              <span className="label">shipping</span>
              <span className="value">
                ${this.state.cartShipping.toFixed(2)}
              </span>
            </li>
            <li className="total-row">
              <span className="label">tax</span>
              <span className="value">${this.state.cartTax}</span>
            </li>
            <li className="total-row final">
              <span className="label">total</span>
              <span className="value">${this.state.cartTotal}</span>
            </li>
            <li className="total-row">
              <Stripe
                className="button"
                handleSubmit={this.handleSubmit}
                cartTotal={this.state.cartTotal}
              />
            </li>
          </ul>
        </div>
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
  updateCartItemThunk: (userId, cartInfo) =>
    dispatch(updateCartItemThunk(userId, cartInfo)),
  deleteCartItemThunk: (userId, cartId, productId) =>
    dispatch(deleteCartItemThunk(userId, cartId, productId))
})

export default connect(mapState, mapDispatch)(Cart)
