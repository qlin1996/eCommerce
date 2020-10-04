import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartThunk} from '../store/cart'
import {me} from '../store/user'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.fetchCartThunk(this.props.user.id)
  }

  render() {
    const cart = this.props.cart
    return (
      <div className="wrap">
        {' '}
        <div className="heading">
          <h2>My Cart</h2>
          <div>
            <Link to="/products" className="continue">
              Continue Shopping
            </Link>
          </div>
        </div>
        <div>
          <img />
        </div>
        <div>
          <ul>
            <li className="total-row">
              <span className="label">Subtotal</span>
              <span className="value">${cart.totalCartPrice}</span>
            </li>
            <li className="total-row">
              <span className="label">shipping</span>
              <span className="value">${cart.totalCartPrice}</span>
            </li>
            <li className="total-row">
              <span className="label">tax</span>
              <span className="value">${cart.totalCartPrice}</span>
            </li>
            <li className="total-row final">
              <span className="label">total</span>
              <span className="value">${cart.totalCartPrice}</span>
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
  fetchCartThunk: userId => dispatch(fetchCartThunk(userId))
})

export default connect(mapState, mapDispatch)(Cart)
