import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class Products extends React.Component {
  async componentDidMount() {
    await this.props.fetchProductsThunk()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <h1>ALL PRODUCTS</h1>
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  fetchProductsThunk: () => dispatch(fetchProductsThunk())
})

export default connect(mapState, mapDispatch)(Products)
