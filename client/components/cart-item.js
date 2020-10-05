import React from 'react'
import {connect} from 'react-redux'
import {updateQtyInCartThunk} from '../store/cart'

/**
 * COMPONENT
 */
class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartItemQuantity: 0
    }
  }

  componentDidMount() {
    this.setState({
      cartItemQuantity: this.props.product.cartItem.cartItemQuantity
    })
  }

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

  handleChange = async (productId, event) => {
    this.setState({
      cartItemQuantity: event.target.value
    })
    await updateQtyInCartThunk(
      this.props.user.id,
      this.props.cart.id,
      productId,
      this.state.cartItemQuantity
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
              <input
                className="qty"
                type="number"
                value={this.state.cartItemQuantity}
                onChange={event => this.handleDelete(product.id, event)}
              />
              <p> x ${product.price}</p>
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
    dispatch(updateQtyInCartThunk(userId, cartId, productId, cartItemQuantity))
})

export default connect(mapState, mapDispatch)(CartItem)
