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

  render() {
    const product = this.props.product || {}
    return (
      <div className="single-product-grid">
        <div className="single-product-card">
          <img src={product.imageUrl} className="single-product-img " />
        </div>
        <div className="single-product-card">
          <h2 className="text-align-center">{product.name}</h2>
          <p className="text-align-center">{product.description}</p>
          <p className="text-align-center">$ {product.price.toFixed(2)}</p>
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
