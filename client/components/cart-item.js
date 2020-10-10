import React from 'react'
import {connect} from 'react-redux'
import {updateQtyInCartThunk, deleteFromCartThunk} from '../store/cart'

/**
 * COMPONENT
 */
class CartItem extends React.Component {
  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  handleDelete = async (productId, event) => {
    event.preventDefault()
    await this.props.deleteFromCartThunk(
      this.props.user.id,
      this.props.cart.id,
      productId
    )
  }

  render() {
    const product = this.props.product
    return (
      <React.Fragment>
        <div className="flex">
          <img className="item-img" src={product.imageUrl} />
          <div className="item-info">
            <h3>{this.capitalizeFirstLetter(product.name)}</h3>
            <div className="qty-and-price">
              <div className="flex">
                <i className="far fa-minus-square" onClick={this.minus} />
                <p>{this.props.product.cartItem.cartItemQuantity}</p>
                <i className="far fa-plus-square" onClick={this.plus} />
              </div>
              <p className="price"> x ${product.price}</p>
            </div>
          </div>
        </div>
        <div className="item-total">
          <h3>${product.price * product.cartItem.cartItemQuantity}</h3>
          <i
            className="far fa-times-circle"
            onClick={event => this.handleDelete(product.id, event)}
          />
        </div>
      </React.Fragment>
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
  updateQtyInCartThunk: (userId, cartId, productId, cartItemQuantity) =>
    dispatch(updateQtyInCartThunk(userId, cartId, productId, cartItemQuantity)),
  deleteFromCartThunk: (userId, cartId, productId) =>
    dispatch(deleteFromCartThunk(userId, cartId, productId))
})

export default connect(mapState, mapDispatch)(CartItem)
