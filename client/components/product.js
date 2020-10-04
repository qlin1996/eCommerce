import React from 'react'
import {connect} from 'react-redux'
import {fetchProductThunk} from '../store/product'

/**
 * COMPONENT
 */
class Product extends React.Component {
  async componentDidMount() {
    await this.props.fetchProductThunk(this.props.match.params.productId)
  }

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  render() {
    const product = this.props.product || {}
    return (
      <div className="single-product-grid">
        <div className="single-product-card">
          <img src={product.imageUrl} className="single-product-img " />
        </div>
        <div className="single-product-card">
          <h2>{product.name && this.capitalizeFirstLetter(product.name)}</h2>
          <p>{product.description}</p>
          <p>$ {product.price && product.price.toFixed(2)}</p>
          <div>
            <button className="button" type="submit">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({product: state.product})

const mapDispatch = dispatch => ({
  fetchProductThunk: productId => dispatch(fetchProductThunk(productId))
})

export default connect(mapState, mapDispatch)(Product)
