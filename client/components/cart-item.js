import React from 'react'
import {connect} from 'react-redux'
import {updateCartItemThunk, deleteCartItemThunk} from '../store/cart'

class CartItem extends React.Component {
  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  handleDelete = async event => {
    event.preventDefault()
    await this.props.deleteCartItemThunk(
      this.props.user.id,
      this.props.cart.id,
      this.props.product.id
    )
  }

  minus = async () => {
    if (this.props.product.cartItem.cartItemQuantity === 1) {
      await this.props.deleteCartItemThunk(
        this.props.user.id,
        this.props.cart.id,
        this.props.product.id
      )
    } else {
      await this.props.updateCartItemThunk(this.props.user.id, {
        cartId: this.props.cart.id,
        productId: this.props.product.id,
        cartItemQuantity: this.props.product.cartItem.cartItemQuantity - 1
      })
    }
  }

  plus = async () => {
    await this.props.updateCartItemThunk(this.props.user.id, {
      cartId: this.props.cart.id,
      productId: this.props.product.id,
      cartItemQuantity: this.props.product.cartItem.cartItemQuantity + 1
    })
  }

  render() {
    const product = this.props.product
    return (
      <React.Fragment>
        <div className="flex">
          <img className="item-img" src={product.imageUrl} />
          <div className="item-info">
            <div>
              <h3>{this.capitalizeFirstLetter(product.name)}</h3>
              <div className="qty-and-price">
                {this.props.product.cartItem.cartItemQuantity >
                product.quantityInStock ? (
                  <small className="error">Not enough in stock</small>
                ) : null}
                <div className="flex">
                  <i className="far fa-minus-square" onClick={this.minus} />
                  <p>{this.props.product.cartItem.cartItemQuantity}</p>
                  <i className="far fa-plus-square" onClick={this.plus} />
                </div>
                <p className="price"> x ${product.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="item-total">
          <h3>
            ${(product.price * product.cartItem.cartItemQuantity).toFixed(2)}
          </h3>
          <i
            className="far fa-times-circle"
            onClick={event => this.handleDelete(event)}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  updateCartItemThunk: (userId, cartInfo) =>
    dispatch(updateCartItemThunk(userId, cartInfo)),
  deleteCartItemThunk: (userId, cartId, productId) =>
    dispatch(deleteCartItemThunk(userId, cartId, productId))
})

export default connect(mapState, mapDispatch)(CartItem)
