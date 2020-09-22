import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPageNum: 1,
      productsPerPage: 15,
      category: 'All'
    }
  }
  async componentDidMount() {
    await this.props.fetchProductsThunk()
  }

  handleSelectChange = event => {
    this.setState({
      category: event.target.value
    })
  }

  paginate = pageNum => {
    this.setState(prevState => ({
      currentPageNum: pageNum,
      productsPerPage: prevState.productsPerPage
    }))
  }

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  render() {
    const productsSelected = this.props.products.filter(
      product => product.category === this.state.category
    )

    // products per page
    const indexOfLastProduct =
      this.state.currentPageNum * this.state.productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage
    const currentProductsOnPage = productsSelected.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )

    // all page numbers
    const allPageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(productsSelected.length / this.state.productsPerPage);
      i++
    ) {
      allPageNumbers.push(i)
    }

    return (
      <div>
        <div>
          <select onChange={this.handleSelectChange}>
            <option value="All">All</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Ring">Ring</option>
            <option value="Earring">Earring</option>
          </select>
        </div>
        <section className="all-products-grid">
          {currentProductsOnPage.map(product => (
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
        <div className="pagination">
          {allPageNumbers.map(number => {
            if (number === this.state.currentPageNum) {
              return (
                <button
                  type="button"
                  className="pagination-button-black"
                  key={number}
                  onClick={() => this.paginate(number)}
                >
                  {number}
                </button>
              )
            } else {
              return (
                <button
                  type="button"
                  className="pagination-button-grey"
                  key={number}
                  onClick={() => this.paginate(number)}
                >
                  {number}
                </button>
              )
            }
          })}
        </div>
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
