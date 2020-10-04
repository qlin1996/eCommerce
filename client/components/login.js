import React from 'react'
import {connect} from 'react-redux'
import {login, me} from '../store/user'
import {Link} from 'react-router-dom'

const Login = props => {
  const {handleSubmit, error} = props

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
        {error &&
          error.response && (
            <small className="error"> {error.response.data} </small>
          )}

        <form onSubmit={handleSubmit} name={name}>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
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

const mapLogin = state => {
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
      dispatch(login(email, password))
      dispatch(me())
    }
  }
}

export default connect(mapLogin, mapDispatch)(Login)
