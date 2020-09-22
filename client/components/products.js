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

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  render() {
    const products = this.props.products || []
    return (
      <section className="all-products-grid">
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="all-products-card">
                <img src={product.imageUrl} className="all-products-img" />
                <h2 className="text-align-center">
                  {this.capitalizeFirstLetter(product.name)}
                </h2>
                <p className="text-align-center">$ {product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
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
