import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'

class AddProduct extends React.Component {
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.addProductThunk(this.state)
    await this.props.history.push('/products')
  }

  render() {
    return (
      <div className="wrap">
        <div className="heading">
          <h2>Add Product</h2>
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
          <input name="name" type="text" onChange={this.handleChange} />

          <label htmlFor="description">
            <small>
              Description
              {!this.state.description && <span> is required</span>}
            </small>
          </label>
          <input name="description" type="text" onChange={this.handleChange} />

          <label htmlFor="price">
            <small>
              Price
              {!this.state.price && <span> is required</span>}
            </small>
          </label>
          <input name="price" type="number" onChange={this.handleChange} />

          <label htmlFor="imageUrl">
            <small>
              Image Url
              {!this.state.imageUrl && <span> is required</span>}
            </small>
          </label>
          <input name="imageUrl" type="text" onChange={this.handleChange} />

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
              Add Product
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapLogin = state => ({})

const mapDispatch = dispatch => ({
  addProductThunk: newProductInfo => dispatch(addProductThunk(newProductInfo))
})

export default connect(mapLogin, mapDispatch)(AddProduct)
