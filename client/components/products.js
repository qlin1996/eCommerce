import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPageNum: 1,
      productsPerPage: 15,
      productsSelected: [],
      category: 'All',
      sort: 'New Arrival'
    }
  }
  async componentDidMount() {
    await this.props.me()
    await this.props.fetchProductsThunk()
    this.setState({productsSelected: this.props.products})
  }

  handleFilter = event => {
    let productsSelectedWithFilter
    let sort = arr => {
      if (this.state.sort === 'New Arrival') {
        return arr.sort(
          (a, b) =>
            a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        )
      } else if (this.state.sort === 'Price: Low to High') {
        return arr.sort(
          (a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0)
        )
      } else {
        return arr.sort(
          (a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0)
        )
      }
    }

    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (this.state.category === 'All') {
          productsSelectedWithFilter = sort(this.props.products)
          this.setState({
            productsSelected: productsSelectedWithFilter
          })
        } else {
          productsSelectedWithFilter = this.props.products.filter(
            product => product.category === this.state.category
          )
          let productsSelectedAfterSort = sort(productsSelectedWithFilter)
          this.setState({
            productsSelected: productsSelectedAfterSort
          })
        }
      }
    )
  }

  handleSort = event => {
    let sortedProducts
    if (event.target.value === 'New Arrival') {
      sortedProducts = this.state.productsSelected.sort(
        (a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
      )
      this.setState({
        productsSelected: sortedProducts,
        [event.target.name]: event.target.value
      })
    } else if (event.target.value === 'Price: Low to High') {
      sortedProducts = this.state.productsSelected.sort(
        (a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0)
      )
      this.setState({
        productsSelected: sortedProducts,
        [event.target.name]: event.target.value
      })
    } else {
      sortedProducts = this.state.productsSelected.sort(
        (a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0)
      )
      this.setState({
        productsSelected: sortedProducts,
        [event.target.name]: event.target.value
      })
    }
  }

  paginate = pageNum => {
    this.setState(prevState => ({
      currentPageNum: pageNum,
      productsPerPage: prevState.productsPerPage
    }))
    window.scrollTo(0, 0)
  }

  capitalizeFirstLetter = str => {
    let arr = str.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    return arr.join(' ')
  }

  render() {
    // products per page
    const indexOfLastProduct =
      this.state.currentPageNum * this.state.productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage
    const currentProductsOnPage = this.state.productsSelected.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )

    // all page numbers
    const allPageNumbers = []
    for (
      let i = 1;
      i <=
      Math.ceil(
        this.state.productsSelected.length / this.state.productsPerPage
      );
      i++
    ) {
      allPageNumbers.push(i)
    }

    return (
      <div>
        <div className="filter-sort">
          <div className="filter-sort">
            <label>Category</label>
            <select
              name="category"
              onChange={event => this.handleFilter(event)}
            >
              <option>All</option>
              <option>Necklace</option>
              <option>Bracelet</option>
              <option>Ring</option>
              <option>Earring</option>
            </select>
          </div>

          <div className="filter-sort">
            <label>Sort By</label>
            <select name="sort" onChange={event => this.handleSort(event)}>
              <option value="New Arrival">New Arrival</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="add-product">
          {this.props.user.isAdmin === 'yes' && (
            <Link to="/add-product">
              <button type="button">Add Product</button>
            </Link>
          )}
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
                  <p className="text-align-center">
                    $ {product.price.toFixed(2)}
                  </p>
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

const mapState = state => ({
  products: state.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProductsThunk: () => dispatch(fetchProductsThunk()),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Products)
