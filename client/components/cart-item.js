import React from 'react'
import {connect} from 'react-redux'

class CartItem extends React.Component {
  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
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
                  <i
                    className="far fa-minus-square"
                    onClick={() =>
                      this.props.minus(
                        this.props.product.id,
                        this.props.product.cartItem.cartItemQuantity - 1
                      )
                    }
                  />
                  <p>{this.props.product.cartItem.cartItemQuantity}</p>
                  <i
                    className="far fa-plus-square"
                    onClick={() =>
                      this.props.plus(
                        this.props.product.id,
                        this.props.product.cartItem.cartItemQuantity + 1
                      )
                    }
                  />
                </div>
                <p className="price"> x ${product.price.toFixed(2)}</p>
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
            onClick={event =>
              this.props.handleDelete(event, this.props.product.id)
            }
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

export default connect(mapState)(CartItem)
