import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="auth-grid">
      <div className="auth-card">
        <img
          className="auth-img"
          src="https://www.datocms-assets.com/25216/1600280588-homepage-trio-3.jpg?q=40&auto=format&w=696"
        />
      </div>
      <div className="auth-card">
        {name === 'login' ? <h2>Login</h2> : <h2>Create Account</h2>}
        <div className="google-icon">
          <a href="/auth/google">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        {name === 'login' ? (
          <p>or use your account</p>
        ) : (
          <p>or use your email for registration</p>
        )}
        {error &&
          error.response && (
            <small className="error"> {error.response.data} </small>
          )}

        <form onSubmit={handleSubmit} name={name}>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <div>
            <button className="button" type="submit">
              {displayName}
            </button>
          </div>
        </form>

        {name === 'login' ? (
          <small className="auth-question">
            <Link to="/signup">New here? Create an account here.</Link>
          </small>
        ) : (
          <small className="auth-question">
            <Link to="/login">Already have an account? Login here.</Link>
          </small>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
