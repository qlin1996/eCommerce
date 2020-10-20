/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/user'
import {updateCartThunk} from '../store/cart'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      shippingStreetAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZipCode: '',
      billingStreetAddress: '',
      billingCity: '',
      billingState: '',
      billingZipCode: '',
      creditCardNumber: '',
      expirationDate: '',
      ccv: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (
      this.state.shippingStreetAddress &&
      this.state.shippingCity &&
      this.state.shippingState &&
      this.isValidUSZip(this.state.shippingZipCode) &&
      this.state.billingStreetAddress &&
      this.state.billingCity &&
      this.state.billingState &&
      this.isValidUSZip(this.state.billingZipCode) &&
      this.state.creditCardNumber &&
      this.state.expirationDate &&
      this.state.ccv
    ) {
      await this.props.updateUserThunk(this.props.user.id, {
        billingStreetAddress: this.state.billingStreetAddress,
        billingCity: this.state.billingCity,
        billingState: this.state.billingState,
        billingZipCode: this.state.billingZipCode
      })
      await this.props.updateCartThunk(this.props.user.id, {
        shippingStreetAddress: this.state.shippingStreetAddress,
        shippingCity: this.state.shippingCity,
        shippingState: this.state.shippingState,
        shippingZipCode: this.state.shippingZipCode
      })
      this.props.history.push('/review-order')
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isValidUSZip = zipCode => {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)
  }

  render() {
    return (
      <div className="wrap">
        <div className="heading">
          <h2>Checkout</h2>
        </div>

        <form
          onSubmit={this.handleSubmit}
          name={name}
          className="checkout-form"
        >
          <div className="checkout-row">
            <h3>Shipping Details</h3>
          </div>
          <label htmlFor="shippingStreetAddress">
            <small>
              Street Address
              {!this.state.shippingStreetAddress && <span> is required</span>}
            </small>
          </label>
          <input
            name="shippingStreetAddress"
            type="text"
            onChange={this.handleChange}
          />
          <div className="checkout-row-2">
            <div className="flex-column">
              <label htmlFor="shippingCity">
                <small>
                  City
                  {!this.state.shippingCity && <span> is required</span>}
                </small>
              </label>
              <input
                name="shippingCity"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex-column">
              <label htmlFor="shippingState">
                <small>
                  State
                  {!this.state.shippingState && <span> is required</span>}
                </small>
              </label>
              <input
                name="shippingState"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex-column">
              <label htmlFor="shippingZipCode">
                <small>
                  Zip Code
                  {!this.isValidUSZip(this.state.shippingZipCode) && (
                    <span> is required</span>
                  )}
                </small>
              </label>
              <input
                name="shippingZipCode"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="checkout-row">
            <h3>Billing Details</h3>
          </div>
          <label htmlFor="billingStreetAddress">
            <small>
              Street Address
              {!this.state.billingStreetAddress && <span> is required</span>}
            </small>
          </label>
          <input
            name="billingStreetAddress"
            type="text"
            onChange={this.handleChange}
          />
          <div className="checkout-row-2">
            <div className="flex-column">
              <label htmlFor="billingCity">
                <small>
                  City
                  {!this.state.billingCity && <span> is required</span>}
                </small>
              </label>
              <input
                name="billingCity"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex-column">
              <label htmlFor="billingState">
                <small>
                  State
                  {!this.state.billingState && <span> is required</span>}
                </small>
              </label>
              <input
                name="billingState"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex-column">
              <label htmlFor="billingZipCode">
                <small>
                  Zip Code
                  {!this.isValidUSZip(this.state.billingZipCode) && (
                    <span> is required</span>
                  )}
                </small>
              </label>
              <input
                name="billingZipCode"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="checkout-row">
            <h3>Payment Information</h3>
          </div>
          <label htmlFor="creditCardNumber">
            <small>
              Credit Card Number
              {!this.state.creditCardNumber && <span> is required</span>}
            </small>
          </label>
          <input
            name="creditCardNumber"
            type="number"
            onChange={this.handleChange}
          />
          <div className="checkout-row-3">
            <div className="flex-column">
              <label htmlFor="expirationDate">
                <small>
                  Expiration Date
                  {!this.state.expirationDate && <span> is required</span>}
                </small>
              </label>
              <input
                name="expirationDate"
                type="date"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex-column">
              <label htmlFor="ccv">
                <small>
                  CCV
                  {!this.state.ccv && <span> is required</span>}
                </small>
              </label>
              <input
                name="ccv"
                type="number"
                min="1"
                max="999"
                onInput={event => {
                  if (event.target.value.length > 3)
                    event.target.value = event.target.value.slice(0, 3)
                }}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <button className="button" type="submit">
              Review Order
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  updateUserThunk: (userId, updatedData) =>
    dispatch(updateUserThunk(userId, updatedData)),
  updateCartThunk: (userId, cartInfo) =>
    dispatch(updateCartThunk(userId, cartInfo))
})

export default connect(mapState, mapDispatch)(Checkout)
