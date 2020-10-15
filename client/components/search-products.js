import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

class SearchProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      searchString: '',
      productsSelected: []
    }
  }

  async componentDidMount() {
    await this.props.fetchProductsThunk()
    this.setState({productsSelected: this.props.products})
  }

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    const productsSelected = this.props.products.filter(product => {
      return (
        product.name
          .toLowerCase()
          .indexOf(this.state.searchString.toLowerCase()) >= 0
      )
    })
    this.setState({productsSelected})
  }

  render() {
    return (
      <div>
        <div className="search">
          <form onSubmit={this.submitSearch}>
            <p>Search Products Here</p>
            <input name="searchString" onChange={this.handleChange} />
          </form>
        </div>
        {!this.state.productsSelected.length && <p>No match found!</p>}
        <section className="all-products-grid">
          {this.state.productsSelected.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="all-products-card">
                  <img src={product.imageUrl} className="all-products-img" />
                  <h2 className="text-align-center">
                    {this.capitalizeFirstLetter(product.name)}
                  </h2>
                  <p className="text-align-center">
                    $ {product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  fetchProductsThunk: () => dispatch(fetchProductsThunk())
})

export default connect(mapState, mapDispatch)(SearchProducts)
