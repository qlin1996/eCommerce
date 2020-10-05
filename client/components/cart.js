import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartThunk, deleteFromCartThunk} from '../store/cart'
import {me} from '../store/user'
import CartItem from './cart-item'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.fetchCartThunk(this.props.user.id)
  }

  render() {
    const products = this.props.cart.products || []
    const subTotal = products
      .map(product => product.price * product.cartItem.cartItemQuantity)
      .reduce((accum, currentVal) => accum + currentVal, 0)
    const shipping = 5.0
    const taxRate = 0.08875

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
            <CartItem product={product} />
          </div>
        ))}
        <div className="totals">
          <ul>
            <li className="total-row">
              <span className="label">subtotal</span>
              <span className="value">${subTotal.toFixed(2)}</span>
            </li>
            <li className="total-row">
              <span className="label">shipping</span>
              <span className="value">${shipping.toFixed(2)}</span>
            </li>
            <li className="total-row">
              <span className="label">tax</span>
              <span className="value">${(subTotal * taxRate).toFixed(2)}</span>
            </li>
            <li className="total-row final">
              <span className="label">total</span>
              <span className="value">
                ${(subTotal * (1 + taxRate)).toFixed(2)}
              </span>
            </li>
            <li className="total-row">
              <button className="button" type="submit">
                Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  me: () => dispatch(me()),
  fetchCartThunk: userId => dispatch(fetchCartThunk(userId)),
  deleteFromCartThunk: (userId, cartId, productId) =>
    dispatch(deleteFromCartThunk(userId, cartId, productId))
})

export default connect(mapState, mapDispatch)(Cart)
