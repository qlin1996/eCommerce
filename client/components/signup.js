import React from 'react'
import {connect} from 'react-redux'
import {signup} from '../store/user'
import {Link} from 'react-router-dom'

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (this.state.email.length && re.test(email)) {
      return true
    } else return false
  }

  render() {
    const {handleSubmit, error} = this.props
    return (
      <div className="auth-grid">
        <div className="auth-card">
          <h2>Create Account</h2>
          <div className="google-icon">
            <a href="/auth/google">
              <i className="fab fa-google-plus-g" />
            </a>
          </div>
          <p>or use your email for registration</p>
          {error && <small className="error"> {error.response.data} </small>}
          <form onSubmit={handleSubmit} name={name}>
            {!this.state.firstName && (
              <small className="validations">First Name is Required</small>
            )}
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={this.handleChange}
            />
            {!this.state.lastName && (
              <small className="validations">Last Name is Required</small>
            )}
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
            {!this.validateEmail(this.state.email) && (
              <small className="validations">Valid Email is Required</small>
            )}
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={this.handleChange}
            />
            {!this.state.password && (
              <small className="validations">Password is Required</small>
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <div>
              <button className="button" type="submit">
                Sign up
              </button>
            </div>
          </form>
          <small className="auth-question">
            <Link to="/login">Already have an account? Login here.</Link>
          </small>
        </div>
        <div className="auth-card">
          <img
            className="auth-img"
            src="https://www.datocms-assets.com/25216/1600280578-homepage-trio-1.jpg?q=40&auto=format&w=1136"
          />
        </div>
      </div>
    )
  }
}

const mapSignup = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(signup(email, password, firstName, lastName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(Signup)
