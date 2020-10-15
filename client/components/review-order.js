import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchCartThunk, updateCartThunk} from '../store/cart'

class ReviewOrder extends React.Component {
  async componentDidMount() {
    await this.props.me()
    await this.props.fetchCartThunk(this.props.user.id)
  }

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  handleSubmit = async () => {
    await this.props.updateCartThunk(this.props.user.id, {
      status: 'processing',
      dateSubmitted: new Date()
    })
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
          <h2>Review Order</h2>
          <div>
            <Link to="/cart" className="continue">
              Edit Order
            </Link>
          </div>
        </div>
        <div className="flex bottom-border">
          <div className="margin-right">
            <h3 className="margin-top">Billing Details</h3>
            <p className="text-align-start">
              {this.props.user.billingStreetAddress}
            </p>
            <p className="text-align-start">
              {this.props.user.billingCity}, {this.props.user.billingState}{' '}
              {this.props.user.billingZipCode}
            </p>
          </div>
          <div>
            <h3 className="margin-top">Shipping Details</h3>
            <p className="text-align-start">
              {this.props.cart.shippingStreetAddress}
            </p>
            <p className="text-align-start">
              {this.props.cart.shippingCity}, {this.props.cart.shippingState}{' '}
              {this.props.cart.shippingZipCode}
            </p>
          </div>
        </div>
        <div>
          <h3>Order Details</h3>
        </div>
        {products.map(product => (
          <div key={product.id} className="item">
            <div className="flex">
              <img className="item-img" src={product.imageUrl} />
              <div className="item-info">
                <div>
                  <h3>{this.capitalizeFirstLetter(product.name)}</h3>
                  <div className="qty-and-price">
                    <div className="flex">
                      <p>
                        {product.cartItem.cartItemQuantity} x ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-total">
              <h3>
                $
                {(product.price * product.cartItem.cartItemQuantity).toFixed(2)}
              </h3>
            </div>
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
                ${(subTotal * (1 + taxRate) + shipping).toFixed(2)}
              </span>
            </li>
            <li className="total-row">
              <Link to="/confirmation">
                <button
                  className="button"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit Order
                </button>
              </Link>
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
    dispatch(updateCartThunk(userId, cartInfo))
})

export default connect(mapState, mapDispatch)(ReviewOrder)
