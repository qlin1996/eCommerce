import React from 'react'
import {connect} from 'react-redux'
import {login, me} from '../store/user'
import {Link} from 'react-router-dom'
import {fetchCartThunk} from '../store/cart'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: false
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.validateEmail(this.state.email) && this.state.password) {
      await this.props.login(this.state.email, this.state.password)
      if (!this.props.error) {
        await this.props.me()
        await this.props.fetchCartThunk(this.props.userId)
      } else {
        this.setState({error: true})
      }
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
    return (
      <div className="auth-grid">
        <div className="auth-card">
          <img
            className="auth-img"
            src="https://www.datocms-assets.com/25216/1600280588-homepage-trio-3.jpg?q=40&auto=format&w=696"
          />
        </div>
        <div className="auth-card">
          <h2>Login</h2>
          <div className="google-icon">
            <a href="/auth/google">
              <i className="fab fa-google-plus-g" />
            </a>
          </div>
          <p>or use your account</p>

          {this.state.error && (
            <small className="error"> {this.props.error.response.data} </small>
          )}

          <form onSubmit={this.handleSubmit} name={name}>
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
                Login
              </button>
            </div>
          </form>

          <small className="auth-question">
            <Link to="/signup">New here? Create an account here.</Link>
          </small>
        </div>
      </div>
    )
  }
}

const mapLogin = state => ({
  error: state.user.error,
  userId: state.user.id,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  me: () => dispatch(me()),
  fetchCartThunk: userId => dispatch(fetchCartThunk(userId))
})

export default connect(mapLogin, mapDispatch)(Login)
