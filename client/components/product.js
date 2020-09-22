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
      <div>
        <h1>SINGLE PRODUCT</h1>
        <img src={product.imageUrl} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>$ {product.price}</p>
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
