/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
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
      this.this.state.shippingStreetAddress &&
      this.state.shippingCity &&
      this.this.state.shippingState &&
      this.isValidUSZip(this.state.shippingZipCode) &&
      this.state.billingStreetAddress &&
      this.state.billingCity &&
      this.state.billingState &&
      this.isValidUSZip(this.state.billingZipCode) &&
      this.state.creditCardNumber &&
      this.state.expirationDate &&
      this.state.ccv
    ) {
      await this.props.checkout()
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
            <h3>Shipping Detail</h3>
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
            <h3>Billing Detail</h3>
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
              <input name="ccv" type="number" onChange={this.handleChange} />
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

/**
 * CONTAINER
 */
const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Checkout)
