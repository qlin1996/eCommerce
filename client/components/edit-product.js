import React from 'react'
import {connect} from 'react-redux'
import {fetchProductThunk, updateProductThunk} from '../store/product'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      quantityInStock: 0,
      category: 'Necklace'
    }
  }

  async componentDidMount() {
    await this.props.fetchProductThunk(this.props.match.params.productId)
    this.setState({
      name: this.props.product.name,
      description: this.props.product.description,
      price: this.props.product.price,
      imageUrl: this.props.product.imageUrl,
      quantityInStock: this.props.product.quantityInStock,
      category: this.props.product.category
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.updateProductThunk(this.props.product.id, this.state)
    await this.props.history.push(`/products/${this.props.product.id}`)
  }

  render() {
    return (
      <div className="wrap">
        <div className="heading">
          <h2>Edit Product</h2>
        </div>

        <form
          onSubmit={this.handleSubmit}
          name={name}
          className="checkout-form"
        >
          <label htmlFor="name">
            <small>
              Name
              {!this.state.name && <span> is required</span>}
            </small>
          </label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label htmlFor="description">
            <small>
              Description
              {!this.state.description && <span> is required</span>}
            </small>
          </label>
          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
          />

          <label htmlFor="price">
            <small>
              Price
              {!this.state.price && <span> is required</span>}
            </small>
          </label>
          <input
            name="price"
            type="number"
            onChange={this.handleChange}
            value={this.state.price}
          />

          <label htmlFor="imageUrl">
            <small>
              Image Url
              {!this.state.imageUrl && <span> is required</span>}
            </small>
          </label>
          <input
            name="imageUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />

          <label htmlFor="quantityInStock">
            <small>
              Quantity In Stock
              {!this.state.quantityInStock && <span> is required</span>}
            </small>
          </label>
          <input
            name="quantityInStock"
            type="text"
            onChange={this.handleChange}
            value={this.state.quantityInStock}
          />

          <label htmlFor="category">
            <small>Category</small>
          </label>

          <select
            style={{margin: 0}}
            name="category"
            onChange={this.handleChange}
          >
            <option>Necklace</option>
            <option>Bracelet</option>
            <option>Ring</option>
            <option>Earring</option>
          </select>

          <div>
            <button className="button" type="submit">
              Update Product
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapLogin = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  fetchProductThunk: productId => dispatch(fetchProductThunk(productId)),
  updateProductThunk: (productId, updatedData) =>
    dispatch(updateProductThunk(productId, updatedData))
})

export default connect(mapLogin, mapDispatch)(EditProduct)
