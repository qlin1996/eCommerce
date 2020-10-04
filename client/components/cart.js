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

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  render() {
    const cart = this.props.cart
    const products = this.props.cart.products || []
    console.log('products in cart', products)
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
            <div className="flex">
              <img className="item-img" src={product.imageUrl} />
              <div className="item-info">
                <h3>{this.capitalizeFirstLetter(product.name)}</h3>
                <div className="qty-and-price">
                  <input
                    className="qty"
                    type="number"
                    placeholder={product.cartItem.cartItemQuantity}
                  />
                  <p> x ${product.cartItem.cartItemPrice}</p>
                </div>
              </div>
            </div>
            <div className="item-total">
              <h3>${product.price}</h3>
              <i className="far fa-times-circle" />
            </div>
          </div>
        ))}
        <div className="totals">
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
